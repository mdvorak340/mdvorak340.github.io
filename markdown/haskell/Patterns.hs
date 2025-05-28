module Patterns
( hx
, hr
, p
, dd
, dt
, li
, bq
) where

import Html
import Text.Regex
import Data.Maybe

-- | Tests a string against a regex pattern.
(=~) :: String -> String -> Bool
xs =~ pattern = isJust $ matchRegex (mkRegex pattern) xs

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
p [] = None
p xs = tag "p" $ text xs

-- | Converts a string to a dd tag, if the string matches a
-- pattern.
dd :: String -> Element
dd (':':' ':xs) = tag "dd" $ text xs
dd _ = None

-- | Converts a string to a dt tag, if the string matches a
-- pattern.
dt :: String -> Element
dt [] = None
dt xs = tag "dt" $ text xs

-- | Converts a string to a blockquote tag, if the string
-- matches a pattern.
bq :: String -> Element
bq ('>':' ':xs) = tag "blockquote" $ text xs
bq _ = None

-- | Converts a string to an li tag, if the string matches a
-- pattern.
li :: String -> Element
li (' ':' ':xs) = incIndent $ li xs
li ('-':' ':xs) = (tag "li" $ text xs) .! attr "type" "unordered"
li ('*':' ':xs) = (tag "li" $ text xs) .! attr "type" "unordered"
li xs = let (y:ys) = words xs
            xs' = unwords ys
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
