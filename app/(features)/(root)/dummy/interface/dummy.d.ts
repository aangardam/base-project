export type TDummy = {
  _id: string;
  name?: string;
  description?: string;
  status?: boolean;
  total?: string;
}

export type TDummyRequestBody = {
  _id?: string;
  name: string;
  description: string;
  status: boolean;
  total: number;
}

export type TGetListResponse = TDummy;


 