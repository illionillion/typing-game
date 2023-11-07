import { Box, Button, Center, Flex, Text, VStack } from "@yamada-ui/react";
import { FC, useEffect, useRef, useState } from "react";

const keyWordList = [
    'Hello World',
    'JavaScript',
    'Windows',
    'Python',
    'GitHub',
    'Model View Controller',
]

export const AppMain: FC = () => {
    /**
     * 文字列の番号
     */
    const currentIndexRef = useRef<number>(0);
    const [currentIndex, setCurrentIndex] = useState<number>(currentIndexRef.current)
    /**
     * 問題の番号
     */
    const arrIndexRef = useRef<number>(0);
    const [arrIndex, setarrIndex] = useState<number>(arrIndexRef.current)
    /**
     * 問題の単語の文字列を配列にしたものを格納
     */
    const textArrRef = useRef<string[]>(keyWordList[arrIndex].split(''))
    const [textArr, setTextArr] = useState<string[]>(textArrRef.current)

    const [isCorrect, setIsCorrect] = useState<boolean>(false)
    const [isEnded, setIsEnded] = useState<boolean>(false)

    const timer = (s: number) => new Promise((resolve) => setTimeout(resolve, s))

    /**
     * キー入力時のイベント
     * @param e 
     * @returns 
     */
    const handlePressKey = async (e: KeyboardEvent) => {

        // 入力値と合っているかどうか
        if (textArrRef.current[currentIndexRef.current] !== e.key) return
        console.log('Hit!!');
        currentIndexRef.current = currentIndexRef.current + 1;
        setCurrentIndex(currentIndexRef.current)
        // 最後の文字かどうか
        if (currentIndexRef.current !== textArrRef.current.length) return
        console.log('Clear!!');
        setIsCorrect(true)
        await timer(1000)
        // 次の単語があるかどうか
        if (keyWordList.length > arrIndexRef.current + 1) {
            currentIndexRef.current = 0;
            setCurrentIndex(currentIndexRef.current)
            arrIndexRef.current = arrIndexRef.current + 1
            setarrIndex(arrIndexRef.current)
            textArrRef.current = keyWordList[arrIndexRef.current].split('')
            setTextArr(textArrRef.current)
        } else {
            console.log('終了')
            setIsEnded(true)
        }
        setIsCorrect(false)
    }

    /**
     * 再スタート
     */
    const handleRestart = () => {
        currentIndexRef.current = 0;
        setCurrentIndex(currentIndexRef.current)
        arrIndexRef.current = 0
        setarrIndex(arrIndexRef.current)
        textArrRef.current = keyWordList[arrIndexRef.current].split('')
        setTextArr(textArrRef.current)
        setIsEnded(false)
    }

    useEffect(() => {
        window.addEventListener('keypress', handlePressKey)
    }, [])

    return <Center w='100vw' h='100svh'>
        <VStack gap={3}>
            <Center>
                <Text>{arrIndex + 1} / {keyWordList.length}</Text>
            </Center>
            <Flex justify={'center'} gap={4}>
                {textArr.map((char, index) => (
                    <Center
                        w='3.5'
                        color={index >= currentIndex ? 'blackAlpha.600' : 'black'}
                        borderBottom={`1px solid ${index >= currentIndex ? 'gray' : 'black'}`}
                        key={index}
                    >
                        {char}
                    </Center>
                ))}
                {isCorrect && <Text color='green.500'>正解！！</Text>}
            </Flex>
            {isEnded && 
                <Center gap={5}>
                    <Text color='red'>Clear!!</Text>
                    <Button onClick={handleRestart}>Restart</Button>
                </Center>
            }
        </VStack>
    </Center>
}