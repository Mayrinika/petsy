import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const StyledButton = withStyles({
    root: {
        background: '#839ca8',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: '20px',
        boxShadow: '0 3px 5px 2px rgba(141, 159, 168, .3)',
        '&:hover':{
            background: '#9cc2d0',
        },
    },
    label: {
        textTransform: 'capitalize',
        fontSize: '16px',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'normal',
    },
})(Button);

export default StyledButton;