export interface SearchResponse {
    result: Curso[]
    pagination: Pagination
  }
  
  export interface Curso {
    id: string
    name: string
    description: string
    type: string
    subjects: any
    contests: string[]
    teachers?: string[]
    subscriptions: number[]
    price: number
    max_instalments: number
    instalment_price: number
    permalink: string
    data_inicio: string
  }
  
  export interface Pagination {
    total: number
    hitsSize: number
    size: number
    from: number
    last_page: number
  }
  