export interface ResponseData {
  id: string;
  itemsData: {
    [key: string]: {
      brand: string;
      item: string;
      numOfItems: number;
    };
  };
  selectedRoom: string;
  selectedRoomNo: string;
  totalRows: number;
}
