import React, {useCallback, useEffect, useRef, useState} from 'react';
import ListItem from "./ListItem";
import {CircularProgress, Container, Typography} from "@mui/material";

import {User} from "./types";
import generateMockUsers from "../hook/generateMockUsers";

const List:React.FC = () => {
    const [users, setUsers] = useState(generateMockUsers(50));
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const containerRef = useRef<any>();
    const page = useRef(1);
    const dataLoaded = useRef(false);

    const loadMoreUsers = () => {
        if (!dataLoaded.current) {
            setLoading(true);
            setTimeout(() => {
                const newUsers = generateMockUsers(50);
                setUsers((prevUsers) => [...prevUsers, ...newUsers]);
                setLoading(false);
                page.current += 1;
                dataLoaded.current = true;
            }, 1000);
        }
    };
    useEffect(() => {
        if(!loading){
            dataLoaded.current = false;
        }
    }, [loading]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                !loading &&
                !dataLoaded.current &&
                containerRef.current &&
                window.innerHeight + window.scrollY >= containerRef.current.clientHeight
            ) {
                loadMoreUsers();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);

    const handleUserClick = useCallback( (user: User) => {
        setSelectedUser(user);
    },[]);
    return (
        <Container sx={{mt: 2}} ref={containerRef}>
            <Typography variant={'h4'}>LIST: </Typography>
            {
                loading && users.length === 0 ? (
                    <CircularProgress />
                ) : users.map((user,idx)  =>
                        <ListItem key={idx} id={idx+1} user={user} onClick={handleUserClick} isActive={user.name === selectedUser?.name}/>
                   )
            }
            {loading && <CircularProgress />}

        </Container>
    );
};

export default List;