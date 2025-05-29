module Html
( Element (..)
, Attribute (..)
, State (..)

, text
, rawText
, tag
, attr
, body

, (.:)
, (./:)
, (!:)
, (.!)

, hx
, hr
, p
, dd
, dt
, li
, bq
, pre
, fenceLength
, fenceLang
, b
, i
, code
, smallCaps
, sub
, sup
, del
) where

import Text.Regex
import Data.Maybe

-- | An HTML element.  Acts as a Left-child Right-sibling tree.
data Element
    = None
    -- | A text node; contains text content and has a sibling.
    | Text
      { content :: String
      , sibling :: Element
      }
    -- | A pure text node that won't be marked up; contains text
    -- content and has a sibling.
    | RawText
      { content :: String
      , sibling :: Element
      }
    -- | An HTML tag; has a name, a child, and a sibling.
    | Tag
      { name      :: String
      , attribute :: Attribute
      , child     :: Element
      , sibling   :: Element
      }
    -- | A top-level container Element; details the current
    -- program state.
    | Body
      { state :: State
      , fence :: Int
      , html  :: Element
      }
    deriving (Eq)

-- | Represents an HTML attribute as a key/value pair.  Acts as a
-- linked list.
data Attribute = Empty | Attribute String String Attribute
    deriving (Eq)

-- | The current state of the program.
data State
    = Idle
    | Code
    | Def
    deriving (Eq, Show)

instance Show Element where
    show None = ""
    show t@(Text _ _) = show $ markup t
    show (RawText content sibling) = htmlSafe content ++ show sibling
    show (Tag name attr child sibling) =
        "<" ++ name ++ show attr ++ ">" ++ show child ++ "</" ++ name ++ ">" ++ show sibling
    show (Body _ _ html) = show html

instance Show Attribute where
    show Empty = ""
    show (Attribute key value next) =
        " " ++ key ++ "=\"" ++ value ++ "\"" ++ show next

-------------------------------------------------------------------------------

-- | Shorthand to create an Element.Text with no sibling.
text :: String -> Element
text [] = None
text xs = Text xs None

-- | Shorthand to create an Element.RawText with no sibling.
rawText :: String -> Element
rawText xs = RawText xs None

-- | Shorthand to create an Element.Tag with no sibling.
tag :: String -> Element -> Element
tag name child = Tag name Empty child None

-- | Shorthand to create an Attribute with no child.
attr :: String -> String -> Attribute
attr key value = Attribute key value Empty

-- | Shorthand to create a Body with no fence.
body :: State -> Element -> Element
body state element = Body state 0 element

-- | Maps over every Text element in the given element.
tmap :: (String -> Element) -> Element -> Element
tmap _ None = None
tmap f (Text xs sib) = f xs .: sib
tmap f (RawText xs sib) = RawText xs $ tmap f sib
tmap f (Tag name as chd sib) = Tag name as (tmap f chd) (tmap f sib)
tmap f (Body state fence chd) = Body state fence $ tmap f chd

-------------------------------------------------------------------------------

-- | Prepends an element to another; cons; returns the former
-- element with the latter as the last sibling.
(.:) :: Element -> Element -> Element
None .: old  = old
new  .: None = new
(Text xs sib) .: old = Text xs $ sib .: old
(RawText xs sib) .: old = RawText xs $ sib .: old
(Tag xs as chd sib) .: old = Tag xs as chd $ sib .: old
(Body _ _ _) .: _ = error "Body node cannot have siblings"

-- | Prepends an element to anothers children; nested cons;
-- returns the later with the former as its first child.
(./:) :: Element -> Element -> Element
None ./: old  = old
new  ./: None = new
new  ./: (Text _ _) = error "Text node cannot have children"
new  ./: (Tag xs as chd sib) = Tag xs as (new .: chd) sib
new  ./: (Body state fence old) = Body state fence $ new .: old

-- | Prepends an attribute to another; cons; returns the former
-- attribute with the latter as the last child.
(!:) :: Attribute -> Attribute -> Attribute
Empty !: old = old
new !: Empty = new
(Attribute key value new) !: old =
    Attribute key value $ new !: old

-- | Adds an attribute to an element.
(.!) :: Element -> Attribute -> Element
tag .! Empty = tag
(Tag name old chd sib) .! new = Tag name (new !: old) chd sib
_ .! _ = error "Only tags can have attributes"

-------------------------------------------------------------------------------

markup :: Element -> Element
markup element = foldl mu element steps
  where mu element' step = tmap step element'
        steps =
            [ mucode
            , muq
            , mua
            , mubi
            , mub
            , mui
            , musmallCaps
            , mudel
            , musub
            , musup
            , finalize
            ]

finalize :: String -> Element
finalize = rawText . exdash

-- | Replaces markdown links with HTML.
mua :: String -> Element
mua = muStep "\\[(.*)\\]\\((.*)\\)" $ \(link:href:[]) ->
    a link .! attr "href" href

-- | Replaces markdown bold italics with HTML.
mubi :: String -> Element
mubi = muStep "\\*\\*\\*(.{2,10})\\*\\*\\*" $ \(xs:[]) -> b xs ./: i ""

-- | Replaces markdown bold with HTML.
mub :: String -> Element
mub = muStep "\\*\\*(.{2,10})\\*\\*" $ \(xs:[]) -> b xs

-- | Replaces markdown italics with HTML.
mui :: String -> Element
mui = muStep "\\*(.{2,10})\\*" $ \(xs:[]) -> i xs

-- | Replaces markdown code with HTML.
mucode :: String -> Element
mucode = muStep "`(.{2,10})`" $ \(xs:[]) -> code xs

-- | Replaces markdown smallcaps with HTML.
musmallCaps :: String -> Element
musmallCaps = muStep "\\^\\^(.{2,10})\\^\\^" $ \(xs:[]) -> smallCaps xs

-- | Replaces markdown superscripts with HTML.
musup :: String -> Element
musup = muStep "\\^(.{2,10})\\^" $ \(xs:[]) -> sup xs

-- | Replaces markdown subscripts with HTML.
musub :: String -> Element
musub = muStep "~(.{2,10})~" $ \(xs:[]) -> sub xs

-- | Replaces markdown strikethroughs with HTML.
mudel :: String -> Element
mudel = muStep "~~(.{2,10})~~" $ \(xs:[]) -> del xs

-- | Replaces markdown strikethroughs with HTML.
muq :: String -> Element
muq = muStep "\"(.{2,10})\"" $ \(xs:[]) -> q xs

-- | TODO: fuck if i know
muStep :: String -> ([String] -> Element) -> (String -> Element)
muStep regex transform = step
  where getMatch = matchRegexAll (mkRegex regex)
        step xs  =
            case getMatch xs of
                Nothing -> text xs
                (Just (before,_,after,subs)) ->
                    let new  = transform subs
                        prev = text before
                        next = step after
                    in  prev .: new .: next

-- | Replaces chained dashes with em- and en- dashes.
exdash :: String -> String
exdash ('-':'-':'-':xs) = '—' : exdash xs
exdash ('-':'-':xs) = '–' : exdash xs
exdash (x:xs) = x : exdash xs
exdash "" = ""

htmlSafe :: String -> String
htmlSafe [] = []
htmlSafe ('&':xs) = "&amp;" ++ htmlSafe xs
htmlSafe ('<':xs) = "&lt;" ++ htmlSafe xs
htmlSafe ('>':xs) = "&gt;" ++ htmlSafe xs
htmlSafe (x:xs) = x : htmlSafe xs

-------------------------------------------------------------------------------

-- | Tests a string against a regex pattern.
(=~) :: String -> String -> Bool
xs =~ pattern = isJust $ matchRegex (mkRegex pattern) xs

-- | Replaces all instances of a regular expression in a string.
replaceAll :: String -> String -> String -> String
replaceAll src regex sub = subRegex (mkRegex regex) src sub

-------------------------------------------------------------------------------

-- | Converts a string to an hx tag, if the string matches a
-- pattern.
hx :: String -> Element
hx ('#':' ':xs) = tag "h1" $ text xs
hx ('#':'#':' ':xs) = tag "h2" $ text xs
hx ('#':'#':'#':' ':xs) = tag "h3" $ text xs
hx ('#':'#':'#':'#':' ':xs) = tag "h4" $ text xs
hx ('#':'#':'#':'#':'#':' ':xs) = tag "h5" $ text xs
hx ('#':'#':'#':'#':'#':'#':' ':xs) = tag "h6" $ text xs
hx _ = None

-- | Converts a string to an hr tag, if the string matches a
-- pattern.
hr :: String -> Element
hr "---" = tag "hr" None
hr _ = None

-- | Converts a string to a p tag, if the string matches a
-- pattern.
p :: String -> Element
p xs = tag "p" $ text xs

-- | Converts a string to a q tag, if the string matches a
-- pattern.
q :: String -> Element
q xs = tag "q" $ text xs

-- | Converts a string to a dd tag, if the string matches a
-- pattern.
dd :: String -> Element
dd (':':' ':xs) = tag "dd" $ text xs
dd _ = None

-- | Converts a string to a dt tag, if the string matches a
-- pattern.
dt :: String -> Element
dt xs = tag "dt" $ text xs

-- | Converts a string to a blockquote tag, if the string
-- matches a pattern.
bq :: String -> Element
bq ('>':' ':xs) = tag "blockquote" $ text xs
bq _ = None

-- | Gets the length of the code block "fence" at the start/end
-- of the given string.
fenceLength :: String -> Int
fenceLength ('`':xs) = 1 + fenceLength xs
fenceLength _ = 0

-- | Returns an attribute containing the language of the code
-- fence header.
fenceLang :: String -> Attribute
fenceLang ('`':xs) = fenceLang xs
fenceLang xs =
    let trimmed = trim xs
    in  if null trimmed
        then Empty
        else attr "code-lang" trimmed
  where trim ys = dropWhile (== ' ') ys

-- | Converts a string to a pre tag.
pre :: String -> Element
pre xs = tag "pre" $ rawText xs

-- | Converts a string to an a tag.
a :: String -> Element
a xs = tag "a" $ text xs

-- | Converts a string to a b tag, if the string
-- matches a pattern.  The b tag is used over the strong tag
-- because the "intention" behind the markup is not known; it is
-- purely structural.
b :: String -> Element
b xs = tag "b" $ text xs

-- | Converts a string to an i tag, if the string
-- matches a pattern.  The i tag is used over the em tag
-- because the "intention" behind the markup is not known; it is
-- purely structural.
i :: String -> Element
i xs = tag "i" $ text xs

-- | Converts a string to a code tag, if the string
-- matches a pattern.
code :: String -> Element
code xs = tag "code" $ rawText xs

-- | Converts a string to a small-caps tag, if the string
-- matches a pattern.
smallCaps :: String -> Element
smallCaps xs = tag "small-caps" $ text xs

-- | Converts a string to a sub tag, if the string
-- matches a pattern.
sub :: String -> Element
sub xs = tag "sub" $ text xs

-- | Converts a string to a sup tag, if the string
-- matches a pattern.
sup :: String -> Element
sup xs = tag "sup" $ text xs

-- | Converts a string to a del tag, if the string
-- matches a pattern.
del :: String -> Element
del xs = tag "del" $ text xs

-- | Converts a string to an li tag, if the string matches a
-- pattern.
li :: String -> Element
li (' ':' ':xs) = incIndent $ li xs
li ('-':' ':xs) = (tag "li" $ text xs) .! attr "type" "unordered"
li ('*':' ':xs) = (tag "li" $ text xs) .! attr "type" "unordered"
li xs = let (y:ys) = words xs
            xs'    = unwords ys
        in  if y =~ "^[0-9]+\\.$"
            then (tag "li" $ text xs') .! attr "type" "ordered"
            else None

-- | Increments the indent level of the given list item.
incIndent :: Element -> Element
incIndent None = None

incIndent tag@Tag{name="li", attribute=Empty} =
    tag .! attr "indent" "1"

incIndent (Tag "li" (Attribute "indent" value as) chd sib) =
    let current = read value :: Int
        next = show $ current + 1
    in  Tag "li" (Attribute "indent" next as) chd sib

incIndent (Tag "li" (Attribute key value as) chd sib) =
    (incIndent $ Tag "li" as chd sib) .! attr key value

incIndent _ = error "Can only increment indent on list items"
