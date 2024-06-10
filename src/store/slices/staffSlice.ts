import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Staff = {
  id: number;
  companyId: number;
  lastName: string;
  firstName: string;
  position: string;
};

type State = {
  selectedStaffIds: number[];
  staff: Staff[];
};
const initialState: State = {
  selectedStaffIds: [],
  staff: [
    {
      id: 1,
      companyId: 1,
      lastName: "Smith",
      firstName: "John",
      position: "Software Engineer",
    },
    {
      id: 2,
      companyId: 1,
      lastName: "Doe",
      firstName: "Jane",
      position: "Product Manager",
    },
    {
      id: 3,
      companyId: 2,
      lastName: "Johnson",
      firstName: "Bob",
      position: "Data Scientist",
    },
    {
      id: 4,
      companyId: 2,
      lastName: "Williams",
      firstName: "Alice",
      position: "UX Designer",
    },
    {
      id: 5,
      companyId: 2,
      lastName: "Brown",
      firstName: "Charlie",
      position: "QA Engineer",
    },
    {
      id: 6,
      companyId: 3,
      lastName: "Davis",
      firstName: "David",
      position: "DevOps Engineer",
    },
  ],
};

export const staffSlice = createSlice({
  name: "staff",
  initialState: initialState,
  reducers: {
    editStaff(
      state,
      action: PayloadAction<{ id: number; field: string; value: string }>
    ) {
      const { id, field, value } = action.payload;
      const staffIndex = state.staff.findIndex((company) => company.id === id);

      if (staffIndex !== -1) {
        state.staff[staffIndex] = {
          ...state.staff[staffIndex],
          [field]: value,
        };
      }
    },
    selectStaff(state, action: PayloadAction<number>) {
      if (state.selectedStaffIds.includes(action.payload)) {
        state.selectedStaffIds = state.selectedStaffIds.filter(
          (id) => id !== action.payload
        );
      } else {
        state.selectedStaffIds.push(action.payload);
      }
    },
    selectAllStaff(state) {
      state.selectedStaffIds = state.staff.map((item) => item.id);
    },
    unselectAllStaff(state) {
      state.selectedStaffIds = [];
    },
    deleteStaff(state, action: PayloadAction<number[]>) {
      const idsToDelete = new Set(action.payload);
      state.staff = state.staff.filter(
        ({id}) => !idsToDelete.has(id)
      );
      state.selectedStaffIds = state.selectedStaffIds.filter(
        (id) => !idsToDelete.has(id)
      );
    },
    createStaff(state, action: PayloadAction<Staff>) {
      state.staff.push(action.payload);
    },
  },
});

export const {
  editStaff,
  deleteStaff,
  selectAllStaff,
  selectStaff,
  unselectAllStaff,
  createStaff
} = staffSlice.actions;

export default staffSlice.reducer;
