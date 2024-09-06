import { Table } from '@mantine/core';
import { useEffect, useState } from 'react';

function ManageIngredientsPage() {

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        // Fetch from http://127.0.0.1:8000/api/ingredients/
        fetch('http://127.0.0.1:8000/api/ingredients/').then((response) => {
            if (response.ok) {
                return response.json().then((data) => {
                    setIngredients(data);
                });
            }
            throw response;
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);


  const rows = ingredients.map((ingredient) => (
    <Table.Tr key={ingredient.id}>
        <Table.Td>{ingredient.id}</Table.Td>
        <Table.Td>{ingredient.name}</Table.Td>
        <Table.Td style={{display:"flex", flexDirection: "column"}}>
            {ingredient.allergens.map((allergen) => {
                return `${allergen.identifier} - ${allergen.name}`;
            })}
        </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Id</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Allergens</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default ManageIngredientsPage;