import { Table, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import config from '../config.cfg';

const ManageOrdersPage = () => {
    const [orders, setOrders] = useState({
        pending: [],
        completed_and_cancelled: [],
    });

    const { user } = useAuth();

    const fetchOrders = async() => {
        fetch(config.api + '/api/orders/').then((response) => {
            if (response.ok) { return response.json(); }
            throw response;
        }).then((data) => {
            console.log(data);
            setOrders({
                pending: data.pending,
                completed_and_cancelled: data.completed_and_cancelled,
            });
            console.log(data);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateOrderStatus = async(orderID, status) => {
        try {
            const response = await fetch(config.api + '/api/orders/status/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    id: orderID,
                    status: status,
                }),
            });
            if (response.ok) {
                fetchOrders();
                console.log("Order status changed successfully");
            } else {
                throw response;
            }
        } catch (error) {
            console.error('Error changing order status:', error);
        }
    };

    const rows = orders.pending.map((order) => (
        <Table.Tr key={order.id}>
            <Table.Td>{order.id}</Table.Td>
            <Table.Td style={{display:"flex", flexDirection: "column"}}>
                {order.items.map((item) => {
                    return `${item.name}`;
                })}
            </Table.Td>
            <Table.Td>
                {order.status}
                <Button onClick={() => updateOrderStatus(order.id, "completed")}>
                    Complete
                </Button>
                <Button onClick={() => updateOrderStatus(order.id, "cancelled")}>
                    Cancel
                </Button>
            </Table.Td>
        </Table.Tr>
    ));

    const rowsCompletedAndCancelled = orders.completed_and_cancelled.map((order) => (
            <Table.Tr key={order.id}>
            <Table.Td>{order.id}</Table.Td>
            <Table.Td style={{display:"flex", flexDirection: "column"}}>
                {order.items.map((item) => {
                    return `${item.name}`;
                })}
            </Table.Td>
            <Table.Td>
                {order.status}
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div>
            <h1>Manage your orders</h1>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                    <Table.Th>Id</Table.Th>
                    <Table.Th>Items</Table.Th>
                    <Table.Th>Status</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>

            <h2>Completed and cancelled orders</h2>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                    <Table.Th>Id</Table.Th>
                    <Table.Th>Items</Table.Th>
                    <Table.Th>Status</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rowsCompletedAndCancelled}
                </Table.Tbody>
            </Table>
        </div>
    );
};

export default ManageOrdersPage;