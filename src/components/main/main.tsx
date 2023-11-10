import { Button, Center, Flex, HStack, Heading, Text, VStack } from "@yamada-ui/react";
import { FC, useRef, useState } from "react";

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
    const [isStarted, setIsStarted] = useState<boolean>(false)
    const [isEnded, setIsEnded] = useState<boolean>(false)

    const startTimeRef = useRef<number>(0)
    const [endTIme, setEndTime] = useState<number>(0)

    const timer = (s: number) => new Promise((resolve) => setTimeout(resolve, s))

    /**
     * キー入力時のイベント
     * @param e 
     * @returns 
     */
    const handlePressKey = async (e: KeyboardEvent) => {

        if (!startTimeRef.current) startTimeRef.current = performance.now()

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
            setEndTime(Math.floor(((performance.now() - startTimeRef.current) / 1000) * 10) / 10)
        }
        setIsCorrect(false)
    }

    /**
     * スタート
     */
    const handleStart = () => {
        setIsStarted(true)
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
        startTimeRef.current = 0
        setEndTime(0)
        setIsEnded(false)
    }

    useEffect(() => {
        window.addEventListener('keypress', handlePressKey)
    }, [])

    return <Center w='100vw' h='100svh'>
        {!isStarted ? (
            <Center flexDir='column' gap={5}>
                <Heading>タイピングゲーム</Heading>
                <Button colorScheme="indigo" onClick={handleStart}>Start</Button>
            </Center>
        ) :
            <VStack gap={3}>
                <Center>
                    <Text>{arrIndex + 1} / {keyWordList.length}</Text>
                </Center>
                <Flex justify={'center'} gap={4}>
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
                    {/* {isCorrect && <Text color='green.500'>正解！！</Text>} */}
                </Flex>
                {isEnded &&
                    <Center gap={5} flexDir='column'>
                        <HStack>
                            <Text color='red'>Clear!!</Text>
                            <Button onClick={handleRestart}>Restart</Button>
                        </HStack>
                        <Text>{endTIme} 秒</Text>
                    </Center>
                }
            </VStack>
        }
    </Center>
}