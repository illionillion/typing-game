import { Box, Center, Flex, Text } from "@yamada-ui/react";
import { FC, useEffect, useRef, useState } from "react";

const defaultText = 'Hello World'

export const AppMain:FC = () => {
    const [textArr, setTextArr] = useState<string[]>(defaultText.split(''))
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const currentIndexRef = useRef<number>(currentIndex);

    const pressKey = (e: KeyboardEvent) => {
        
        if (textArr[currentIndexRef.current] === e.key) {
            console.log('Hit!!');
            setCurrentIndex(prev => prev + 1)
            currentIndexRef.current = currentIndexRef.current + 1;
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
                        borderBottom={`1px solid ${index >= currentIndex ? 'blackAlpha.600' : 'black'}`}
                        key={index}
                    >
                        {char}
                    </Center>
                ))}
            </Flex>
        </Box>
    </Center>
}