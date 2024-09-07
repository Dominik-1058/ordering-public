import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IconPlus, IconInfoCircle, IconArrowBack, IconNumber1, IconShoppingCartCopy } from '@tabler/icons-react';
import { Box, Button, Container, Group, Stack, Table, Title, Text, Affix } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AddItemButtonComponent from './AddItemButtonComponent';
import classes from './ItemListComponent.module.css';
import cockStockUrl from '../assets/img/cock-stock.jpg';
import { useAuth } from '../AuthContext';
import { notifications } from '@mantine/notifications';

import config from '../config.cfg';

const ItemListComponent = () => {
    const [items, setItems] = useState([]);
    const { user } = useAuth();
    const containerRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [flippedIndex, setFlippedIndex] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);

    const setItem = (itemID) => {
        setCurrentItem(itemID);
    }

    useEffect(() => {
        fetch(config.api + '/api/items/').then((response) => {
            if (response.ok) {
                return response.json().then((data) => {
                    setItems(data);
                });
            }
            throw response;
        }).then((data) => {
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const placeOrder = async() => {
        try {
            const response = await fetch(config.api + '/api/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    items: [currentItem],
                }),
            });
            if (response.ok) {
                console.log("Order placed successfully");
                setCurrentItem(null);
                notifications.show({
                    title: 'Order placed!',
                    message: 'Your order has been placed successfully!',
                    color: 'green',
                    icon: '🍹',
                });
            } else {
                throw response;
            }
        } catch (error) {
            console.error('Error placing order:', error);
            notifications.show({
                title: 'Order failed!',
                message: 'There was an error placing your order. Please try again later.',
                color: 'red',
                icon: 'X',
            });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveIndex(containerRefs.current.indexOf(entry.target));
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.8,
            }
        );

        containerRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            containerRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [items]);

    const handleFlip = (index) => {
        setFlippedIndex(index === flippedIndex ? null : index);
    };

    return (
        <Box p={10}>
                <Group justify='space-between' align='center' style={{width: "100%", height: "50px"}}>
                    <Stack gap={0} >
                        <Text c='mainYellow.5' component='small' size='sm'>Japanese inspired cocktails</Text>
                        <Title c='mainYellow.5' order={2}>Choose your drink</Title>
                    </Stack>
                    {/* <Button onClick={placeOrder} size='3rem' disabled={currentItem == null} style={{opacity: currentItem == null ? "0.5" : "1"}}>
                        <IconShoppingCartCopy
                            size="3rem"
                            style={{
                                color: 'var(--mantine-color-mainYellow-4)',
                                border: '1px solid var(--mantine-color-mainYellow-4)',
                            }}
                        />
                    </Button> */}
                    {/* <Affix position={{ position: 'fixed', top: 70, right: 10 }}>
                        <Button onClick={placeOrder} size='3rem' disabled={currentItem == null} style={{opacity: currentItem == null ? "0.5" : "1"}}>
                            <IconShoppingCartCopy
                                size="3rem"
                                style={{
                                    color: 'var(--mantine-color-mainYellow-4)',
                                    border: '1px solid var(--mantine-color-mainYellow-4)',
                                }}
                            />
                        </Button>
                    </Affix> */}
                </Group>
                <Affix position={{ position: 'fixed', top: 70, right: 40 }}>
                        <Button onClick={placeOrder} size='3rem' disabled={currentItem == null} style={{opacity: currentItem == null ? "0.5" : "1"}}>
                            <IconShoppingCartCopy
                                size="3rem"
                                style={{
                                    color: 'var(--mantine-color-mainYellow-4)',
                                    border: '1px solid var(--mantine-color-mainYellow-4)',
                                }}
                            />
                        </Button>
                    </Affix>
            <Container >
                <Stack direction="column" gap="md" display="flex" mt="xl" style={{ overflowY: "scroll", height: "calc(100vh - 100px - 76px)", scrollSnapType: "y mandatory"}}>
                    {items.map((item, index) => (
                        <Container
                            key={index}
                            display="flex"
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                opacity: activeIndex === index ? 1 : 0.5,
                                transition: 'opacity 0.3s ease',
                                scrollSnapAlign: 'center',
                            }}
                            ref={(el) => (containerRefs.current[index] = el)}
                        >
                            <div
                                style={{
                                    height: '60vh',
                                    minWidth: '200px',
                                    width: '70vw',
                                    marginLeft: '25px',
                                    alignSelf: 'end',
                                    borderColor: 'var(--mantine-color-mainYellow-4)',
                                    border: '1px solid',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    className={`${classes.flipCard} ${flippedIndex === index ? classes.flipCardFlipped : ''}`}
                                    style={{
                                        height: '90%',
                                        minWidth: "200px",
                                        width: '70vw',
                                        position: 'relative',
                                        right: '15%',
                                    }}
                                >
                                    <div className={classes.flipCardInner}>
                                        <div
                                            className={classes.flipCardFront}
                                            style={{
                                                background: `url(${item.image ? `data:image/jpg;base64,${item.image}` : cockStockUrl})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'top center',
                                            }}
                                        >
                                            <AddItemButtonComponent itemID={item.id} currentItem={currentItem} setCurrentItem={setItem} key={item.id}/>
                                            <IconInfoCircle
                                                size="2rem"
                                                style={{
                                                    position: 'absolute',
                                                    top: '0',
                                                    right: '0',
                                                    margin: '10px',
                                                    color: 'var(--mantine-color-mainYellow-4)',
                                                }}
                                                onClick={() => handleFlip(index)}
                                            />
                                            <div style={{alignSelf:"flex-end", justifySelf:"flex-end"}}>
                                                <Text style={{fontSize: "3rem", fontWeight: "600", width:"50%", paddingLeft: "5px", textShadow: "1px 1px 2px black"}} c="mainYellow.5">{item.name}</Text>
                                            </div>
                                        </div>
                                        <div className={classes.flipCardBack}>
                                            <div
                                                style={{
                                                    content: '',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    background: `url(${item.image ? `data:image/jpg;base64,${item.image}` : cockStockUrl})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'top center',
                                                    opacity: 0.5, // Adjust the opacity to control transparency
                                                    zIndex: -1,
                                                }}
                                            ></div>
                                            <IconArrowBack size="2rem" style={{
                                                position: 'absolute',
                                                top: '0',
                                                right: '0',
                                                margin: '10px',
                                                zIndex: 30000000,
                                                color: 'var(--mantine-color-mainYellow-4)',
                                                border: '1px solid var(--mantine-color-mainYellow-4)',
                                             }} onClick={() => handleFlip(index)} />
                                            <Stack justify='center' align='center'>
                                                <Title order={3} style={{ color: 'var(--mantine-color-mainYellow-4)' }}>{item.name}</Title>
                                                <Box  p={'1rem'}>
                                                    <Text size="xl" c="mainYellow.5">
                                                        {item.ingredients && item.ingredients.length > 0 ? (
                                                            <>
                                                            <div>
                                                                {item.ingredients.map((ingredient, index) => (
                                                                <span key={index}>
                                                                    {ingredient.name}
                                                                    {index < item.ingredients.length - 1 && ', '}
                                                                </span>
                                                                ))}
                                                            </div>
                                                            {item.ingredients.some(ingredient => ingredient.alcoholic) && (
                                                                <div style={{ paddingTop: '1rem', fontStyle: 'italic' }}>Alcoholic</div>
                                                            )}
                                                            </>
                                                        ) : (
                                                            'No ingredients available!'
                                                        )}
                                                    </Text>
                                                </Box>
                                            </Stack>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};

export default ItemListComponent;