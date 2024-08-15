import DirectoryItem from '../DirectoryItem';

import { DirectoryContainer } from './styles';

const Directory = ({categories}) => {
    return (
        <DirectoryContainer>
            {categories.map((category) => {
                return (
                    <DirectoryItem key={category.id} category={category} />
                )
            })}
        </DirectoryContainer>
    )
}

export default Directory;