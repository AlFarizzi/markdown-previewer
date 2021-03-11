import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    IconButton,
    Box,
    Heading,
    Text
  } from "@chakra-ui/react"
  import { HamburgerIcon, DeleteIcon } from '@chakra-ui/icons';

function Sidebar(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const card = (id,title,content) => {
        return (
            <Box 
            p={5} 
            mt={5} 
            shadow="md" 
            borderWidth="1px"
            onClick={e => {
                props.cTextHandler(content);
                props.cTitleHandler(title);
            }}
            >
                <Heading size="md" isTruncated>{title}</Heading>
                <Text isTruncated>{content}</Text>
                <IconButton onClick={e => props.deleteHandler(id)} icon={<DeleteIcon />} size="sm" colorScheme="red"/>
            </Box>
        )
    }
    return (
        <>
            <Box p={4}>
                <IconButton  
                colorScheme="facebook"
                icon={<HamburgerIcon />} 
                onClick={onOpen} 
                size="sm"/>
            </Box>
            <Drawer
                isOpen={isOpen}
                placement={"left"}
                onClose={onClose}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerHeader> Markdown Previewer Notes </DrawerHeader>
                        <DrawerBody>
                            {
                                props.posts?.map((post,key) => (
                                    <Box key={key}>
                                        {card(post.id,post.title, post.content)}
                                    </Box>
                                ))
                            }
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
}

export default Sidebar;