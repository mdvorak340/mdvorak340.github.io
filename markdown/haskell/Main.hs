import Html
import Patterns
import Control.Monad

main :: IO ()
main =  do
    contents <- getContents
    let lineContents = lines contents
        initialBody  = Body Idle None
        finalBody    = foldr handleLine initialBody lineContents
    print finalBody

-- | Processes a string given the current program state and
-- returns a new program state.
handleLine :: String -> Element -> Element

handleLine line (Body Idle html)
    | null line       = Body Idle html
    | hx line /= None = Body Idle $ hx line .: html
    | hr line /= None = Body Idle $ hr line .: html
    | dd line /= None = Body InDefinition $ dd line .: html
    | li line /= None = Body Idle $ li line .: html
    | bq line /= None = Body Idle $ bq line .: html
    | otherwise       = Body Idle $ p line .: html

handleLine line (Body InDefinition html)
    | null line       = Body InDefinition html
    | dd line /= None = Body InDefinition $ dd line .: html
    | otherwise       = Body Idle $ dt line .: html
