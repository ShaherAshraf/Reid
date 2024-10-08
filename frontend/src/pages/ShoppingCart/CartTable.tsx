import {
  styled,
  Button,
  ButtonGroup,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector } from '../../app/store';
import { ProductEntity } from '../../gql/graphql';
import ItemImage from './ItemImage';
import useAuth from '../../hooks/useAuth';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LocaleContext } from '../../contexts/locale/LocaleContext';
import { useAsideDrawer } from '../../hooks/useAsideDrawer';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '& .styledButton': {
    color: theme.palette.mode == 'light' ? 'primary.main' : 'white',
    borderColor: theme.palette.mode == 'light' ? 'primary.main' : 'white',
    '&:hover': {
      borderColor: theme.palette.mode == 'light' ? 'primary.main' : 'white',
    },
  },
}));

const CartTable = ({ products, target }: { products: ProductEntity[]; target: string }) => {
  const { cartCounter, wishlistCounter, sessionCartCounter, sessionWishlistCounter } =
    useAppSelector((store) => store.drawer);
  const { handleCart } = useAsideDrawer();
  const { activeUser } = useAuth();
  const { getLatestStoredValue, setProductCounter } = useSessionStorage('cartProducts');
  const { getLatestStoredValue: getLatestStoredWishlistValue } =
    useSessionStorage('wishlistProducts');
  const { t } = useTranslation();
  const { lang } = useContext(LocaleContext);

  let tableProducts;
  if (activeUser) tableProducts = products;
  if (!activeUser && target == 'cart') tableProducts = getLatestStoredValue('cartProducts').data;
  if (!activeUser && target == 'wishlist')
    tableProducts = getLatestStoredWishlistValue('wishlistProducts').data;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const handleProductCounter = (product, counterFlag: boolean) => {
    const updateCounter = async (cartCounter: number) => {
      try {
        const updateCartProduct = {
          id: product.id,
          data: {
            users_permissions_user: product.attributes?.users_permissions_user.data.id,
            productId: product.attributes?.productId,
            name: product.attributes?.name,
            size: product.attributes?.size,
            color: product.attributes?.color,
            cartCounter: cartCounter,
            cart: product.attributes?.cart.data.id,
          },
        };
        await handleCart('UPDATE', updateCartProduct);
      } catch (e) {
        console.log(e);
      }
    };

    if (counterFlag) {
      if (activeUser) updateCounter(product.attributes!.cartCounter! + 1);
      if (!activeUser) {
        product.attributes!.cartCounter! = product.attributes!.cartCounter! + 1;
        setProductCounter(product, target == 'cart' ? 'cartProducts' : 'wishlistProducts');
      }
    } else {
      if (product.attributes!.cartCounter! > 1) {
        if (activeUser) updateCounter(product.attributes!.cartCounter! - 1);
        if (!activeUser) {
          product.attributes!.cartCounter! = product.attributes!.cartCounter! - 1;
          setProductCounter(product, target == 'cart' ? 'cartProducts' : 'wishlistProducts');
        }
      }
    }
  };

  return (
    <div className='table'>
      <Typography
        variant='h4'
        sx={{
          color: 'white',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: lang == 'ar' ? 'row-reverse' : 'row',
        }}
      >
        <span>
          {t('Your2')} {target == 'cart' ? t('ShoppingCart2') : t('wishlist')}
        </span>
        {activeUser && (
          <span>
            {target == 'cart' ? cartCounter : wishlistCounter} {t('Items')}
          </span>
        )}
        {!activeUser && (
          <span>
            {target == 'cart' ? sessionCartCounter : sessionWishlistCounter} {t('Items')}
          </span>
        )}
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>{t('PRODUCT')}</StyledTableCell>
              <StyledTableCell align='center'>{t('DESCRIPTION')}</StyledTableCell>
              {target == 'cart' && <StyledTableCell align='center'>{t('SIZE')}</StyledTableCell>}
              {target == 'cart' && <StyledTableCell align='center'>{t('COLOR')}</StyledTableCell>}
              {target == 'cart' && (
                <StyledTableCell align='center'>{t('QUANTITY')}</StyledTableCell>
              )}
              <StyledTableCell align='center'>{t('PRICE')}</StyledTableCell>
              {target == 'cart' && <StyledTableCell align='center'>{t('TOTAL')}</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableProducts.map((product: ProductEntity) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell align='center'>
                  <ItemImage product={product} target={target} />
                </StyledTableCell>
                <StyledTableCell align='center'>{product.attributes?.name}</StyledTableCell>
                {target == 'cart' && (
                  <StyledTableCell align='center'>{product.attributes?.size}</StyledTableCell>
                )}
                {target == 'cart' && (
                  <StyledTableCell align='center'>{product.attributes?.color}</StyledTableCell>
                )}
                {target == 'cart' && (
                  <StyledTableCell align='center'>
                    <ButtonGroup>
                      <Button
                        aria-label='reduce'
                        onClick={() => handleProductCounter(product, false)}
                        className='styledButton'
                      >
                        <RemoveIcon fontSize='small' />
                      </Button>
                      <Button sx={{ fontSize: '1.8rem !important' }} className='styledButton'>
                        {product.attributes?.cartCounter}
                      </Button>
                      <Button
                        aria-label='increase'
                        onClick={() => handleProductCounter(product, true)}
                        className='styledButton'
                      >
                        <AddIcon fontSize='small' />
                      </Button>
                    </ButtonGroup>
                  </StyledTableCell>
                )}
                <StyledTableCell align='center'>{product.attributes?.price}</StyledTableCell>
                {target == 'cart' && (
                  <StyledTableCell align='center'>
                    {(product.attributes!.cartCounter! * product.attributes!.price).toFixed(2)}
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CartTable;
