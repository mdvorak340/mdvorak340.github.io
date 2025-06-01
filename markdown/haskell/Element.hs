{-|
Module      : Element
Description : Contains types and functions for HTML elements.
License     : MIT
Maintainer  : mdvorak.personal@gmail.com

Contains data types and helper functions for constructing and
manipulating HTML Elements, HTML Tag Attributes, and the
document as a whole.
-}

module Element
( Element (..)
, Attribute (..)
, Document (..)
, State (..)
, text
, plainText
, tag
, attr
, doc
, stage
, setFence
, tmap
, (.:.)
, (.:/)
, (!:!)
, (.:!)
) where

-- | An HTML element.  Acts as a Left-child Right-sibling tree.
data Element
    -- | An empty node.
    = None
    -- | A text node; contains text content (including markup)
    -- and has a sibling.
    | Text
      { content :: String
      , sibling :: Element
      }
    -- | A pure text node that won't be marked up; contains text
    -- content and has a sibling.
    | PlainText
      { content :: String
      , sibling :: Element
      }
    -- | An HTML tag; has a name, attributes, a child, and a
    -- sibling.
    | Tag
      { name      :: String
      , attribute :: Attribute
      , child     :: Element
      , sibling   :: Element
      }
    deriving (Eq)

instance Show Element where
    show None = ""
    show (Text content sibling)      = content ++ show sibling
    show (PlainText content sibling) = htmlSafe content ++ show sibling
      where htmlSafe [] = []
            htmlSafe ('&':xs) = "&amp;" ++ htmlSafe xs
            htmlSafe ('<':xs) = "&lt;"  ++ htmlSafe xs
            htmlSafe ('>':xs) = "&gt;"  ++ htmlSafe xs
            htmlSafe (x:xs)   = x : htmlSafe xs
    show (Tag name attr child sibling) =
        "<" ++ name ++ show attr ++ ">" ++ show child ++ "</" ++ name ++ ">" ++ show sibling

-- | Represents an HTML attribute as a key/value pair.  Acts as a
-- linked list.
data Attribute = Empty | Attribute String String Attribute
    deriving (Eq)

instance Show Attribute where
    show Empty = ""
    show (Attribute key value next) =
        " " ++ key ++ "=\"" ++ value ++ "\"" ++ show next

-- | A top-level container for the whole document; details the
-- current program state.
data Document =
    Document
    { state  :: State
    , staged :: String
    , fence  :: Int
    , html   :: Element
    }

instance Show Document where
    show (Document _ _ _ html) = show html

-- | The current state of the program.
data State
    = Idle
    | InFence
    | InDefine
    | InH1
    | InH2
    | InQuote
    deriving (Eq, Show)

-- | Shorthand to create a Text Element with no sibling.
text :: String -> Element
text [] = None
text xs = Text xs None

-- | Shorthand to create a PlainText Element with no sibling.
plainText :: String -> Element
plainText xs = PlainText xs None

-- | Shorthand to create a Tag Element with no sibling.
tag :: String -> Element -> Element
tag name child = Tag name Empty child None

-- | Shorthand to create an Attribute with no child.
attr :: String -> String -> Attribute
attr key value = Attribute key value Empty

-- | Shorthand to create a Document with no staged content or
-- fence.
doc :: State -> Element -> Document
doc state element = Document state "" 0 element

-- | Shorthand to stage a string within a Document.  Overwrites
-- currently staged text.
stage :: Document -> String -> Document
stage (Document state _ fence html) xs = Document state xs fence html

-- | Shorthand to set the current codeblock fence length within
-- a Document.  Overwrites the current fence length.
setFence :: Document -> Int -> Document
setFence (Document state staged _ html) x = Document state staged x html

-- | Maps over every Text element in the given element.
tmap :: (String -> Element) -> Element -> Element
tmap _ None = None
tmap f (Text xs sib) = f xs .:. tmap f sib
tmap f (PlainText xs sib) = PlainText xs $ tmap f sib
tmap f (Tag name as chd sib) = Tag name as (tmap f chd) (tmap f sib)

-- | Prepends an element to another; cons; returns the former
-- element with the latter as the last sibling.
(.:.) :: Element -> Element -> Element
None .:. old  = old
new  .:. None = new
(Text xs sib) .:. old       = Text xs $ sib .:. old
(PlainText xs sib) .:. old  = PlainText xs $ sib .:. old
(Tag xs as chd sib) .:. old = Tag xs as chd $ sib .:. old

-- | Prepends an element to anothers children; nested cons;
-- returns the later with the former as its first child.
(.:/) :: Element -> Element -> Element
None .:/ old  = old
new  .:/ None = new
new  .:/ (Text _ _) = error "Text node cannot have children"
new  .:/ (Tag xs as chd sib)    = Tag xs as (new .:. chd) sib

-- | Prepends an attribute to another; cons; returns the former
-- attribute with the latter as the last child.
(!:!) :: Attribute -> Attribute -> Attribute
Empty !:! old = old
new !:! Empty = new
(Attribute key value new) !:! old = Attribute key value $ new !:! old

-- | Adds an attribute to an element.
(.:!) :: Element -> Attribute -> Element
tag .:! Empty = tag
(Tag name old chd sib) .:! new = Tag name (new !:! old) chd sib
_ .:! _ = error "Only tags can have attributes"
