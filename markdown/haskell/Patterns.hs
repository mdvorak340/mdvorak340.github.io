{-|
Module      : Patterns
Description : Contains functions for common HTML tags.
License     : MIT
Maintainer  : mdvorak.personal@gmail.com

Contains functions used to build HTML tags from Strings, and to
test various attributes of Strings in regards to the properties
of HTML tags.
-}

module Patterns
( p
, hx
, li
, dd
, dt
, pre
, getFence
, fenceAttr
, bq
, hr
, isH1Underline
, isH2Underline
, a
, b
, i
, q
, code
, smallCaps
, sub
, sup
, del
) where

import Text.Regex
import Data.Maybe
import Element

-- | Converts a string to a p tag, if the string matches a
-- pattern.  If no text is given, returns None.
p :: String -> Element
p [] = None
p xs = tag "p" $ text xs

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

-- | Converts a string to an li tag, if the string matches a
-- pattern.
li :: String -> Element
li (' ':' ':xs) = incIndent $ li xs
li ('-':' ':xs) = (tag "li" $ text xs) .:! attr "type" "unordered"
li ('*':' ':xs) = (tag "li" $ text xs) .:! attr "type" "unordered"
li xs = let (y:ys) = words xs
            xs'    = unwords ys
        in  if y =~ "^[0-9]+\\.$"
            then (tag "li" $ text xs') .:! attr "type" "ordered"
            else None

-- | Tests a string against a regex pattern.
(=~) :: String -> String -> Bool
xs =~ pattern = isJust $ matchRegex (mkRegex pattern) xs

-- | Increments the indent level of the given list item.
incIndent :: Element -> Element
incIndent None = None
incIndent tag@Tag{name="li", attribute=Empty} =
    tag .:! attr "indent" "1"
incIndent (Tag "li" (Attribute "indent" value as) chd sib) =
    let current = read value :: Int
        next = show $ current + 1
    in  Tag "li" (Attribute "indent" next as) chd sib
incIndent (Tag "li" (Attribute key value as) chd sib) =
    (incIndent $ Tag "li" as chd sib) .:! attr key value
incIndent _ = error "Can only increment indent on list items"

-- | Converts a string to a dd tag, if the string matches a
-- pattern.
dd :: String -> Element
dd (':':' ':xs) = tag "dd" $ text xs
dd _ = None

-- | Converts a string to a dt tag, if the string matches a
-- pattern.
dt :: String -> Element
dt xs = tag "dt" $ text xs

-- | Converts a string to a pre tag.
pre :: String -> Element
pre xs = tag "pre" $ plainText xs

-- | Gets the length of the code block "fence" at the start/end
-- of the given string.
getFence :: String -> Int
getFence ('`':xs) = 1 + getFence xs
getFence _ = 0

-- | Returns an attribute containing the language of the code
-- fence header.
fenceAttr :: String -> Attribute
fenceAttr ('`':xs) = fenceAttr xs
fenceAttr xs =
    let trimmed = trim xs
    in  if null trimmed
        then Empty
        else attr "code-lang" trimmed
  where trim ys = dropWhile (== ' ') ys

-- | Converts a string to a blockquote tag, if the string
-- matches a pattern.
bq :: String -> Element
bq ('>':' ':xs) = tag "blockquote" $ text xs
bq _ = None

-- | Returns an hr tag.
hr :: Element
hr = tag "hr" None

-- | Returns True if the String matches the pattern for a h1 underline.
isH1Underline :: String -> Bool
isH1Underline "===" = True
isH1Underline ('=':'=':'=':xs) = isH1Underline $ "==" ++ xs
isH1Underline _ = False

-- | Returns True if the String matches the pattern for a h2 underline.
isH2Underline :: String -> Bool
isH2Underline "---" = True
isH2Underline ('-':'-':'-':xs) = isH2Underline $ "--" ++ xs
isH2Underline _ = False

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

-- | Converts a string to a q tag, if the string matches a
-- pattern.
q :: String -> Element
q xs = tag "q" $ text xs

-- | Converts a string to a code tag, if the string
-- matches a pattern.
code :: String -> Element
code xs = tag "code" $ plainText xs

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
