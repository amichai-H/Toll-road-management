let map;
let table;

const bigMLMap = () => 
{   
    if(map === null || map === undefined)
    {
        map = new Map();
        return map;
    }
    return map;
}

const bigMLTable = () => 
{   
    if(table === null || table === undefined)
    {
        table =
            {
                'section_1' : [0, 0, 0, 0, 0],
                'section_2' : [0, 0, 0, 0, 0],
                'section_3' : [0, 0, 0, 0, 0],
                'section_4' : [0, 0, 0, 0, 0],
                'section_5' : [0, 0, 0, 0, 0]
            }
        ;
        return table;
    }
    return table;
}

module.exports = {
    bigMLMap: bigMLMap,
    bigMLTable: bigMLTable, 
  };