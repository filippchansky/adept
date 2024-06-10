import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Company = {
  id: number;
  name: string;
  employeesCount: number;
  address: string;
};

interface CompaniesTableState {
  companies: Company[];
  selectedCompaniesIds: number[];
}

const initialState: CompaniesTableState = {
  companies: [
    {
      id: 1,
      name: "Company A",
      employeesCount: 100,
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 2,
      name: "Company B",
      employeesCount: 200,
      address: "456 Elm St, Anytown, USA",
    },
    {
      id: 3,
      name: "Company C",
      employeesCount: 300,
      address: "789 Oak St, Anytown, USA",
    },
  ],
  selectedCompaniesIds: [],
};

export const companySlice = createSlice({
  name: "company",
  initialState: initialState,
  reducers: {
    setCompanies(state, action: PayloadAction<Company[]>) {
      state.companies = action.payload;
    },
    selectCompany(state, action: PayloadAction<number>) {
      if (state.selectedCompaniesIds.includes(action.payload)) {
        state.selectedCompaniesIds = state.selectedCompaniesIds.filter(
          (id) => id !== action.payload
        );
      } else {
        state.selectedCompaniesIds.push(action.payload);
      }
    },
    selectAllCompanies(state) {
      state.selectedCompaniesIds = state.companies.map((company) => company.id);
    },
    unselectAllCompanies(state) {
      state.selectedCompaniesIds = [];
    },
    editCompany(
      state,
      action: PayloadAction<{ id: number; field: string; value: string }>
    ) {
      const { id, field, value } = action.payload;
      const companyIndex = state.companies.findIndex(
        (company) => company.id === id
      );

      if (companyIndex !== -1) {
        state.companies[companyIndex] = {
          ...state.companies[companyIndex],
          [field]: value,
        };
      }
    },
    deleteCompanies(state, action: PayloadAction<number[]>) {
      const idsToDelete = new Set(action.payload);
      state.companies = state.companies.filter(
        (company) => !idsToDelete.has(company.id)
      );
      state.selectedCompaniesIds = state.selectedCompaniesIds.filter(
        (id) => !idsToDelete.has(id)
      );
    },
  },
});

export const {
  setCompanies,
  selectCompany,
  selectAllCompanies,
  unselectAllCompanies,
  editCompany,
  deleteCompanies,
} = companySlice.actions;

export default companySlice.reducer;
