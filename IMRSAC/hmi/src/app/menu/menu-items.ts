import { MenuItem } from 'primeng/api/menuitem';


export const MENU_ITEMS: MenuItem[] = [
    {
        label: 'Plantações',
        items: [
            {
                label: 'Minhas plantações',
                icon: 'crop-icon',
            },
            {
                label: 'Criar plantação',
                icon: 'seeds-icon',
            }
        ],
    },
    {
        separator: true,
    },
    {        
        label: 'Irrigações',
        items: [
            {
                label: 'Últimas irrigações',
                icon: 'watering-icon'
            },
        ],
        styleClass: 'menu-label-color',
    },
    {
        separator: true,
    },
    {
        label: 'Áreas',
        items: [
            {
                label: 'Minhas áreas',
                icon: 'field-icon'
            },
            {
                label: 'Cadastrar nova área',
                icon: 'new-field-icon'
            }
        ]
    },
    {
        separator: true,
    },
    {
        label: 'Sensores',
        items: [
            {
                label: 'Meus sensores',
                icon: 'soil-sensor-icon'
            },
            {
                label: 'Adicionar um novo sensor',
                icon: 'soil-moisture-sensor-icon'
            }
        ]
    },
    {
        separator: true,
    },
    {
        label: 'Solos',
        items: [
            {
                label: 'Meus solos',
                icon: 'soil-icon'
            },
            {
                label: 'Cadastrar novo tipo de solo',
                icon: 'soil-sample-icon'
            }
        ]
    },
    {
        separator: true,
    },
    {
        label: 'Culturas',
        items: [
            {
                label: 'Minhas culturas',
                icon: 'vegetables-icon'
            },
            {
                label: 'Cadastrar nova cultura',
                icon: 'growing-plant-icon'
            }
        ]
    },
    {
        separator: true,
    },
    {
        label: 'Sistemas de Irrigação',
        items: [
            {
                label: 'Meus sistemas',
                icon: 'water-drop-icon'
            },
            {
                label: 'Cadastrar novo sistema',
                icon: 'spinkler-icon'
            }
        ]
    }
];