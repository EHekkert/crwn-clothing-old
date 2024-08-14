import DirectoryItem from '../DirectoryItem';

import './index.scss';

const Directory = ({categories}) => {
    return (
        <div className='directory-container'>
            {categories.map((category) => {
                return (
                    <DirectoryItem key={category.id} category={category} />
                )
            })}
        </div>
    )
}

export default Directory;