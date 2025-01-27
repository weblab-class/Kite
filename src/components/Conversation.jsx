import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Conversation = () => {
    const { id } = useParams();

    useEffect(() => {
        loadConversation(id);
    }, [id]);

    return (
        <div>Conversation Component</div>
    );
};

export default Conversation; 