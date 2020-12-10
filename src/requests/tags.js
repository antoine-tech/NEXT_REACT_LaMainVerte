import API from '../sevices/index';

const getTags = async () =>
{
    const response = await API.find('/tags', false).then((res)=>res.json())

    return response
}

export {getTags}