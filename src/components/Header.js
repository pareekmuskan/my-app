import React from 'react';

const Header = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>Task Management Dashboard</h1>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
    },
    logo: {
        height: '40px',
        marginRight: '10px',
    },
    title: {
        fontSize: '1.5rem',
        color: '#333',
    },
};

export default Header;
