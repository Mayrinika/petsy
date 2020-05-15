import React from 'react';

import {Tooltip} from '@material-ui/core';
import {IconButton} from '@material-ui/core';

export default ({children, onClick, tip, placement, btnClassName, tipClassName})=>(
    <Tooltip title={tip} placement={placement} className={tipClassName}>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
);