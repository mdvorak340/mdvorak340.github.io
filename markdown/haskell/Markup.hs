module Markup
( markup
) where

-- | Performs inline markup on a piece of text, e.g. applying
-- em and strong tags.
markup :: String -> String
markup = exdash

-- | Replaces chained dashes with em- and en- dashes.
exdash :: String -> String
exdash ('-':'-':'-':xs) = '—' : exdash xs
exdash ('-':'-':xs)     = '–' : exdash xs
exdash (x:xs)           = x   : exdash xs
exdash "" = ""
