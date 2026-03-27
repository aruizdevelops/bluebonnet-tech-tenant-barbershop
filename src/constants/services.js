import ContentCutIcon from '@mui/icons-material/ContentCut';
import SpaIcon from '@mui/icons-material/Spa';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ChildCareIcon from '@mui/icons-material/ChildCare';

const SERVICES = [
  {
    id: 'classic-cut',
    name: 'The Classic Cut',
    price: '$25 – $35',
    bookingPrice: '$30',
    description: 'Precision haircut with hot towel finish and style consultation. Includes shampoo and blow-dry.',
    icon: ContentCutIcon,
  },
  {
    id: 'full-service',
    name: 'The Full Service',
    price: '$40 – $55',
    bookingPrice: '$50',
    description: 'Haircut and traditional straight-razor shave with premium hot lather. The complete gentleman\'s experience.',
    icon: AutoAwesomeIcon,
  },
  {
    id: 'clean-shave',
    name: 'The Clean Shave',
    price: '$15 – $25',
    bookingPrice: '$20',
    description: 'Traditional straight-razor shave with hot lather, warm towel wrap, and cold towel finish.',
    icon: SpaIcon,
  },
  {
    id: 'junior-cut',
    name: 'The Junior Cut',
    price: '$20 – $30',
    bookingPrice: '$25',
    description: 'Expert cut for young gentlemen 12 and under. Patient, friendly, and always sharp.',
    icon: ChildCareIcon,
  },
];

export default SERVICES;
