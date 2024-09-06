import React, { useState, useEffect } from 'react';
import { Button } from '@mantine/core';
import { IconPlus, IconNumber1 } from '@tabler/icons-react';

const AddItemButtonComponent = ({ itemID, currentItem, setCurrentItem }) => {
    const [isInCart, setIsInCard] = useState(currentItem === itemID);

    useEffect(() => {
        setIsInCard(currentItem === itemID);
    }, [currentItem]);

    console.log("isinCart: ", isInCart);

    const toggleInCart = () => {
        if (isInCart) {
            setCurrentItem(null);
            setIsInCard(false);
            console.log("Removed item from cart: ", itemID);
        } else {
            console.log("Item ID: ", itemID);
            setCurrentItem(itemID);
            setIsInCard(true);
            console.log("Added item to cart: ", itemID);
        }
        console.log("Current item: ", currentItem);
    }
    
    return (
        <Button onClick={toggleInCart}
            style={{
                background: 'none',      // Remove button background
                border: 'none',          // Remove button border
                cursor: 'pointer',       // Add pointer cursor to indicate clickability
                padding: '0',            // Remove padding
                position: 'absolute',     // Ensure positioning works for the icons
                width: '3rem',           // Define width for the button (optional)
                height: '3rem',          // Define height for the button (optional)
                top: '0',
                left: '0',
            }}
        >
            {isInCart ? 
                (<IconNumber1
                    size="2rem"
                    style={{
                        margin: '10px',
                        color: 'var(--mantine-color-mainYellow-4)',
                        border: '1px solid var(--mantine-color-mainYellow-4)',
                    }}
                />) : (<IconPlus
                        size="2rem"
                        style={{
                            margin: '10px',
                            color: 'var(--mantine-color-mainYellow-4)',
                            border: '1px solid var(--mantine-color-mainYellow-4)',
                        }}
                    />
                )}
        </Button>
    );
};

export default AddItemButtonComponent;