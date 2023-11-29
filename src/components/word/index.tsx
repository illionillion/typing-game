import { Center, Flex } from "@yamada-ui/react";
import { FC } from "react";

interface WordDisplayProps {
    textArr: string[]
    isCorrect: boolean
    isEnded: boolean
    currentIndex: number
}

export const WordDisplay: FC<WordDisplayProps> = ({
    textArr,
    isCorrect,
    isEnded,
    currentIndex
}) => {
    return <Flex justify='center' gap={4}>
        {textArr.map((char, index) => (
            <Center
                w='3.5'
                color={(isCorrect || isEnded ? 'green.500' : index >= currentIndex ? 'blackAlpha.600' : 'black')}
                borderBottomWidth='1px'
                borderBottomStyle='solid'
                borderBottomColor={isCorrect || isEnded ? 'green.500' : index >= currentIndex ? 'gray' : 'black'}
                key={index}
            >
                {char}
            </Center>
        ))}
    </Flex>
}