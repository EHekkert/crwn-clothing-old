import { useNavigate } from 'react-router-dom';

import './index.scss';

const DirectoryItem = ({category: {title, imageUrl}}) => {    
    const navigate = useNavigate();

    const goToCategoryHandler = () => {
      navigate(`shop/${title}`);
  };

    return (
        <div className='directory-item-container'>
            <div className='background-image' style={{
                backgroundImage: `url(${imageUrl})`
            }} />
            <div className='body' onClick={goToCategoryHandler}>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
}

export default DirectoryItem;