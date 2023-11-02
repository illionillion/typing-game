import { Box, Center, Flex, Text } from "@yamada-ui/react";
import { FC, useEffect, useRef, useState } from "react";

const keyWordList = [
    'Hello World',
    'JavaScript',
    'Windows',
    'Python',
    'GitHub',
    'Model View Controller',
]

export const AppMain:FC = () => {
    const [textArr, setTextArr] = useState<string[]>(defaultText.split(''))
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    /**
     * refに格納してレンダリングさせないようにする
     */
    const currentIndexRef = useRef<number>(currentIndex);

    const pressKey = (e: KeyboardEvent) => {
        
        if (textArr[currentIndexRef.current] === e.key) {
            console.log('Hit!!');
            setCurrentIndex(prev => prev + 1)
            currentIndexRef.current = currentIndexRef.current + 1;
            if (currentIndexRef.current === textArr.length) {
                console.log('Clear!!');
            }
        }
    
    }
    
    useEffect(() => {
        window.addEventListener('keypress', pressKey)
    },[])

    return <Center w='100vw' h='100svh'>
        <Box>
            <Flex gap={4}>
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
            </Flex>
        </Box>
    </Center>
}