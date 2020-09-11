const sortByDateTime = (arr) => arr.sort((a, b) => (+a.dateTime > +b.dateTime ? 1 : -1));
export default sortByDateTime;
