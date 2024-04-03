import { IconButton, InputBase, Paper, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from './ProductCard';
import StyledProductsHeader from './StyledProductsHeader';
import StyledButton from '../../components/Buttons/StyledButton';
import { useQuery } from '@apollo/client';
import { CategoryEntity, Maybe, ProductEntity } from '../../gql/graphql';
import { GET_CATEGORIES, GET_CATEGORY, PAGINATION } from '../../graphql/queries';
import { useState } from 'react';

const StyledProductsGrid = styled('div')(({ theme }) => ({
  margin: '6rem auto',
  display: 'grid',
  justifyItems: 'center',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gridTemplateRows: 'repeat(auto-fill, 1fr)',
  gap: '3rem',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

const ProductsGrid = () => {
  const { loading, error, data: categoriesData } = useQuery(GET_CATEGORIES);
  const [categoryId, setCategoryId] = useState('1');

  const PAGE_SIZE = 16;

  const {
    loading: productsLoading,
    error: productsError,
    data: productsData,
    refetch: getCategoryProducts,
  } = useQuery(GET_CATEGORY, {
    variables: { id: categoryId, limit: PAGE_SIZE },
  });

  const {
    loading: loadingPagination,
    error: errorPagination,
    data: dataPagination,
    refetch: refetchPagination,
  } = useQuery(PAGINATION, {
    variables: { categoryId: categoryId, limit: PAGE_SIZE },
  });

  const handleFilter = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    categoryId: Maybe<string> | undefined
  ) => {
    const filterItems = document.querySelectorAll('.filterButtons .filterItem');
    for (const item of filterItems) item.classList.remove('active');
    const activeItem = (e.target as HTMLSpanElement).closest('.filterItem')!;
    activeItem.classList.add('active');
    setCategoryId(categoryId!);
    getCategoryProducts({ id: categoryId, limit: PAGE_SIZE });
    refetchPagination({ categoryId, limit: PAGE_SIZE });
  };

  if (loading) return false;
  if (error) return false;

  const handleLoadMore = () => {
    getCategoryProducts({
      id: categoryId,
      limit:
        productsData.category.data.attributes.products.data.length +
        dataPagination.products.meta.pagination.pageSize,
    });
  };

  if (productsLoading) return <p>Loading...</p>;
  if (productsError) return <p>Error : {productsError.message}</p>;

  if (loadingPagination) return <p>Loading...</p>;
  if (errorPagination) return <p>Error : {errorPagination.message}</p>;

  return (
    <>
      <StyledProductsHeader>
        <ul className='filterButtons'>
          {categoriesData.categories.data.map((category: CategoryEntity) => (
            <li
              key={category.id}
              className={`filterItem ${category.id == categoryId ? 'active' : null}`}
              onClick={(e) => handleFilter(e, category.id)}
            >
              <span>{category.attributes?.categoryName}</span>
            </li>
          ))}
        </ul>
        <Paper
          className='searchBox'
          component='form'
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 400,
            borderRadius: '24px',
          }}
        >
          <IconButton sx={{ p: '10px' }} aria-label='search'>
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, pr: '2rem' }}
            placeholder='Search'
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => getCategoryProducts({ name: e.target.value })}
          />
        </Paper>
      </StyledProductsHeader>
      <StyledProductsGrid>
        {productsData.category.data.attributes.products.data.map((product: ProductEntity) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </StyledProductsGrid>
      {dataPagination.products.meta.pagination.pageCount > 1 &&
        dataPagination.products.meta.pagination.total !=
          productsData.category.data.attributes.products.data.length && (
          <div style={{ textAlign: 'center' }}>
            <StyledButton
              sx={{
                bgcolor: 'gray.main',
                color: 'black',
                p: '1rem 5rem',
                '&:hover': { bgcolor: 'black', color: 'gray.main' },
              }}
              onClick={handleLoadMore}
            >
              LOAD MORE
            </StyledButton>
          </div>
        )}
    </>
  );
};

export default ProductsGrid;