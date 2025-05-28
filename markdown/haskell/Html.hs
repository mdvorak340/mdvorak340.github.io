module Html
( Element (..)
, Attribute (..)
, State (..)
, text
, rawText
, tag
, attr
, (.:)
, (./:)
, (!:)
, (.!)
) where

import Markup

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
    | InUList
    | InOList
    | InCode
    | InPara
    | InQuote
    | InDefinition
    deriving (Eq, Show)

instance Show Element where
    show None = ""
    show (Text content sibling) = markup content ++ show sibling
    show (RawText content sibling) = content ++ show sibling
    show (Tag name attr child sibling) =
        "<" ++ name ++ show attr ++ ">" ++ show child ++ "</" ++ name ++ ">" ++ show sibling
    show (Body _ html) = show html

instance Show Attribute where
    show Empty = ""
    show (Attribute key value next) =
        " " ++ key ++ "=\"" ++ value ++ "\"" ++ show next

-- | Shorthand to create an Element.Text with no sibling.
text :: String -> Element
text [] = None
text xs = Text xs None

-- | Shorthand to create an Element.RawText with no sibling.
rawText :: String -> Element
rawText [] = None
rawText xs = RawText xs None

-- | Shorthand to create an Element.Tag with no sibling.
tag :: String -> Element -> Element
tag name child = Tag name Empty child None

-- | Shorthand to create an Attribute with no child.
attr :: String -> String -> Attribute
attr key value = Attribute key value Empty

-- | Prepends an element to another; cons; returns the former
-- element with the latter as the last sibling.
(.:) :: Element -> Element -> Element
None .: old  = old
new  .: None = new
(Text xs sib) .: old = Text xs $ sib .: old
(Tag xs as chd sib) .: old = Tag xs as chd $ sib .: old
(Body _ _) .: _ = error "Body node cannot have siblings"

-- | Prepends an element to anothers children; nested cons;
-- returns the later with the former as its first child.
(./:) :: Element -> Element -> Element
None ./: old  = old
new  ./: None = new
new  ./: (Text _ _) = error "Text node cannot have children"
new  ./: (Tag xs as chd sib) = Tag xs as (new .: chd) sib
new  ./: (Body state old) = Body state $ new .: old

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
