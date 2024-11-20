import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import toast from 'react-hot-toast';

import { formatCurrency } from '../../utils/helpers';
import { deleteCabin } from '../../services/apiCabins';

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Price = styled.div`
    font-family: 'Sono';
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
    } = cabin;

    // получаем доступ к нашему экземпляру запросов React Query который мы создавали в App(в нашем случае queryClient) - для обновления кэша
    // с помощью useQueryClient
    const queryClient = useQueryClient();

    // создаем мутацию для удаления (React Query)
    const { isLoading: isDeleting, mutate } = useMutation({
        mutationFn: (id) => deleteCabin(id),
        // можно сократить до
        // mutationFn: deleteCabin,
        onSuccess: () => {
            toast.success('Cabin successfully deleted!');

            queryClient.invalidateQueries({
                queryKey: ['cabins'], // ключ запроса который нужно обновить (его мы выбрали в CabinTable - queryKey: ['cabins'])
            });
        }, // если удаление прошло успешно

        onError: (err) => toast.error(err.message), // если произошла ошибка
    });

    return (
        <TableRow role="row">
            <Img src={image} alt={name} />
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            <Discount>{formatCurrency(discount)}</Discount>
            <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
                Delete
            </button>
        </TableRow>
    );
}

export default CabinRow;