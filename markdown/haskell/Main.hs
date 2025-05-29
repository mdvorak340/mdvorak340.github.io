import Html
import Control.Monad

main :: IO ()
main =  do
    contents <- getContents
    let lineContents = lines contents
        initialBody  = body Idle None
        finalBody    = foldr handleLine initialBody lineContents
    print finalBody

-- | Processes a string given the current program state and
-- returns a new program state.
handleLine :: String -> Element -> Element

handleLine line (Body Idle _ html)
    | null line            = body Idle html
    | hx line /= None      = body Idle $ hx line .: html
    | hr line /= None      = body Idle $ hr line .: html
    | dd line /= None      = body Def  $ dd line .: html
    | li line /= None      = body Idle $ li line .: html
    | bq line /= None      = body Idle $ bq line .: html
    | fenceLength line > 2 = Body Code (fenceLength line) $ pre "" .: html
    | otherwise            = body Idle $ p line .: html

handleLine line (Body Code fence html)
    | fenceLength line == fence = body Idle $ html .! fenceLang line
    | otherwise                 = Body Code fence $ rawText line ./: html

handleLine line (Body Def _ html)
    | null line       = body Def html
    | dd line /= None = body Def $ dd line .: html
    | otherwise       = body Idle $ dt line .: html
