import { useNavigate } from 'react-router-dom';

import { BackgroundImage, Body, DirectoryItemContainer } from './styles';

const DirectoryItem = ({category: {title, imageUrl}}) => {    
    const navigate = useNavigate();

    const goToCategoryHandler = () => {
      navigate(`shop/${title}`);
  };

    return (
        <DirectoryItemContainer>
            <BackgroundImage imageUrl={imageUrl} />
            <Body onClick={goToCategoryHandler}>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;