{-|
Module      : Markup
Description : Contains functions for marking up Markdown text.
License     : MIT
Maintainer  : mdvorak.personal@gmail.com

Contains functions to convert HTML Text nodes that contain
Markdown markup into PlainText nodes and span tags like <b />,
<i />, <a />, etc.
-}

module Markup
( markUpText
) where

import Text.Regex
import Element
import Patterns

-- | Converts all Text Elements in the given Element into
-- PlainText, replacing Markdown markup with HTML tags.
markUpText :: Element -> Element
markUpText element = foldl handleStep element steps
  where handleStep element' step = tmap step element'
        steps =
            [ codeStep
            , qStep
            , aStep
            , rawAStep
            , biStep
            , bStep
            , iStep
            , smallCapsStep
            , delStep
            , subStep
            , supStep
            , finalizeStep
            ]

finalizeStep :: String -> Element
finalizeStep = plainText . exdash

-- | Replaces markdown links with HTML.
aStep :: String -> Element
aStep = buildStep "\\[(.*)\\]\\((.*)\\)" $ \(link:href:[]) ->
    a link .:! attr "href" href

-- | Replaces raw markdown links with HTML.
rawAStep :: String -> Element
rawAStep = buildStep "<(.{2,50})>" $ \(href:[]) ->
    a href .:! attr "href" href

-- | Replaces markdown bold italics with HTML.
biStep :: String -> Element
biStep = buildStep "\\*\\*\\*(.{2,15})\\*\\*\\*" $ \(xs:[]) -> b xs .:/ i ""

-- | Replaces markdown bold with HTML.
bStep :: String -> Element
bStep = buildStep "\\*\\*(.{2,10})\\*\\*" $ \(xs:[]) -> b xs

-- | Replaces markdown italics with HTML.
iStep :: String -> Element
iStep = buildStep "\\*(.{2,10})\\*" $ \(xs:[]) -> i xs

-- | Replaces markdown code with HTML.
codeStep :: String -> Element
codeStep = buildStep "`(.{2,10})`" $ \(xs:[]) -> code xs

-- | Replaces markdown smallcaps with HTML.
smallCapsStep :: String -> Element
smallCapsStep = buildStep "\\^\\^(.{2,10})\\^\\^" $ \(xs:[]) -> smallCaps xs

-- | Replaces markdown superscripts with HTML.
supStep :: String -> Element
supStep = buildStep "\\^(.{2,8})\\^" $ \(xs:[]) -> sup xs

-- | Replaces markdown subscripts with HTML.
subStep :: String -> Element
subStep = buildStep "~(.{2,4})~" $ \(xs:[]) -> sub xs

-- | Replaces markdown strikethroughs with HTML.
delStep :: String -> Element
delStep = buildStep "~~(.{2,20})~~" $ \(xs:[]) -> del xs

-- | Replaces markdown quotes with HTML.
qStep :: String -> Element
qStep = buildStep "\"(.{2,100})\"" $ \(xs:[]) -> q xs

buildStep :: String -> ([String] -> Element) -> (String -> Element)
buildStep regex subTransform = step
  where getMatch = matchRegexAll (mkRegex regex)
        step xs  =
            case getMatch xs of
                Nothing -> text xs
                (Just (before,_,after,subs)) ->
                    let new  = subTransform subs
                        prev = text before
                        next = step after
                    in  prev .:. new .:. next

-- | Replaces chained dashes with em- and en- dashes.
exdash :: String -> String
exdash ('-':'-':'-':xs) = '—' : exdash xs
exdash ('-':'-':xs)     = '–' : exdash xs
exdash (x:xs)           = x   : exdash xs
exdash "" = ""
