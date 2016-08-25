/** use this to generate random color for material design
 * */

import React from 'react';

export default {
    generate : function () {
        var keys = ["#F44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#2196F3","#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548"];
        var itemIndex = Math.floor((Math.random() * 16) + 1);
        return keys[itemIndex];
    }
}