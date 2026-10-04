export type ProductType = {
    id : number,
    productName : string ,
    description? : string ,
    category? : CategoryType ,
    stock : number,
    imageUrl : string ,
    rating : number ,
    price : number,
    reviews : number,
    created_by?:string,
}

export type CategoryType = {
    id:number ,
    categoryName:string,
    products : ProductType[]
}