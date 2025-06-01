{-|
Module      : Main
Description : Entry point for Markdown->HTML CLI.
License     : MIT
Maintainer  : mdvorak.personal@gmail.com

Reads a Markdown file from the STDIN and prints a corresponding
HTML file to the STDOUT. 
-}

module Main where

import Element
import Markup
import Patterns

main = do
    contents <- getContents
    print $ parseInput contents

parseInput :: String -> Element
parseInput content =
    let contentLines = lines content
        initialState = doc Idle None
        finalState   = foldr handleLine initialState contentLines
    in  markUpText $ html finalState

-- | Processes a string given the current program state and
-- returns a new program state.
handleLine :: String -> Document -> Document

handleLine line (Document Idle staged _ html)
    | null pending       = doc Idle     html
    | null line          = doc Idle     $ p pending  .:. html
    | hx line /= None    = doc Idle     $ hx pending .:. html
    | isH1Underline line = doc InH1     $ p staged   .:. html
    | isH2Underline line = doc InH2     $ p staged   .:. html
    | dd line /= None    = doc InDefine $ dd pending .:. html
    | li line /= None    = doc Idle     $ li pending .:. html
    | bq line /= None    = doc InQuote  html `stage` drop 2 pending
    | getFence line > 2  = doc InFence  (pre "\n" .:. p staged .:. html) `setFence` getFence line
    | otherwise          = doc Idle     html `stage` pending
  where pending = getPending line staged

handleLine line (Document InH1 staged _ html)
    | null pending = doc InH1 html
    | null line    = doc Idle $ hx ("# " ++ pending) .:. html
    | otherwise    = doc InH1 html `stage` pending
  where pending = getPending line staged

handleLine line (Document InH2 staged _ html)
    | null pending = doc Idle $ hr .:. html
    | null line    = doc Idle $ hx ("## " ++ pending) .:. html
    | otherwise    = doc InH2 html `stage` pending
  where pending = getPending line staged

handleLine line (Document InDefine staged _ html)
    | null pending    = doc InDefine html
    | null line       = doc Idle     $ dt pending .:. html
    | dd line /= None = doc InDefine $ dd pending .:. html
    | otherwise       = doc InDefine html `stage` pending
  where pending = getPending line staged

handleLine line (Document InQuote staged _ html)
    | bq line /= None = doc InQuote html `stage` drop 2 pending
    | otherwise       = handleLine line . doc Idle $ bq ("> " ++ staged) .:. html
  where pending = getPending line staged

handleLine line (Document InFence _ fence html)
    | getFence line == fence = doc Idle    $ html .:! fenceAttr line
    | otherwise              = doc InFence (plainText ('\n':line) .:/ html) `setFence` fence

getPending :: String -> String -> String
getPending line [] = line
getPending [] staged = staged
getPending line staged = line ++ " " ++ staged