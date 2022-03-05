/* eslint-disable no-undef */
import { useLocalStorage } from "react-use";
import { useState } from "react";
import ToastifyError from "../helpers/toastify/ToastifyError";

export default function Provider() {
  const [userPopUp, setUserPopUp] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openUserEditModal, setOpenUserEditModal] = useState(false);
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [actualPage, setActualPage] = useState("");
  const [formModalToEdit, setFormModalToEdit] = useState({});
  const [editMessage, setEditMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUserData, setCurrentUserData, removeCurrentUserData] = useLocalStorage("user", {});
  const [editUserName, setEditUserName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editCpf, setEditCpf] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editPass, setEditPass] = useState("");
  const [editConfirmPass, setEditConfirmPass] = useState("");

  const [chargesSummaryData, setChargesSummaryData] = useState([]);
  const [summaryChargesMsg, setSummaryChargesMsg] = useState("");
  const [customersSummaryData, setCustomersSummaryData] = useState([]);
  const [summaryCustomersMsg, setSummaryCustomersMsg] = useState("");

  const [currentCustomer, setCurrentCustomer] = useState("");
  const [editingCostumer, setEditingCostumer] = useState();
  const [currentCustomerName, setCurrentCustomerName] = useState("");
  const [currentClientData, setCurrentClientData] = useState();
  const [currentClientId, setCurrentClientId] = useLocalStorage("customerId", 0);
  const [charges, setCharges] = useState([]);
  const [chargesMsg, setChargesMsg] = useState("");
  const [openModalCharge, setOpenModalCharge] = useState(false);
  const [custumersChanged, setCustumersChanged] = useState();
  const [addingCharges, setAddingCharges] = useState();

  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [detailsModal, setDetailsModal] = useState({});
  const [openModalEditingCharge, setOpenModalEditingCharge] = useState(false);
  const [editingCustomerData, setEditingCustomerData] = useState({});
  const [homeLoading, setHomeLoading] = useState(false);

  const [openModalDelete, setOpenModalDelete] = useState();
  const [getIdChargeForDelete, setGetIdChargeForDelete] = useState();
  const [refreshPage, setRefreshPage] = useState(true);
  const [defaulterFilter, setDefaulterFilter] = useState(false);
  const [upToDateFilter, setUpToDateFilter] = useState(false);
  const [paidFilter, setPaidFilter] = useState(false);
  const [expectedFilter, setExpectedFilter] = useState(false);
  const [overdueFilter, setOverdueFilter] = useState(false);
  const [homeFilter, setHomeFilter] = useState(false);

  const [customersLoading, setCustomersLoading] = useState(false);
  const [chargesLoading, setChargesLoading] = useState(false);
  const [customersDetailsLoading, setCustomersDetailsLoading] = useState(false);
  const [chargesCustomerLoading, setChargesCustomerLoading] = useState(false);

  const [searchFieldCustomers, setSearchFieldCustomers] = useState(false);

  // função formatadora das iniciais do nome de usuário no header
  const loginUserNameInitialsObtainer = (object) => (object.name_user.split(" ").length > 1 ? object.name_user.split(" ")[0].substr(0, 1) + object.name_user.split(" ")[1].substr(0, 1) : object.name_user.split(" ")[0].substr(0, 2));

  const handleSummaryCharges = async () => {
    try {
      setHomeLoading(true);
      const data = await (await fetch(
        "https://payment-system-app-api.herokuapp.com/charges/summary",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )).json();

      setChargesSummaryData(data);

      if (!data.expected || !data.overdue || !data.paid) {
        setSummaryChargesMsg(data);
      }
    } catch (error) {
      setHomeLoading(false);
    }
  };

  const handleSummaryCustomers = async () => {
    try {
      setHomeLoading(true);
      const data = await (await fetch(
        "https://payment-system-app-api.herokuapp.com/customers/summary/all",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )).json();

      setCustomersSummaryData(data);

      if (!data.defaulter || !data.upToDate) {
        setSummaryCustomersMsg(data);
      }
      setHomeLoading(false);
    } catch (error) {
      setHomeLoading(false);
    }
  };

  const handleCustomerDetails = async (id) => {
    try {
      setCustomersDetailsLoading(true);
      const response = await fetch(`https://payment-system-app-api.herokuapp.com/customers/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const costumer = await response.json();
      setEditingCostumer(costumer[0]);
      setCurrentClientData(costumer[0]);
      setCurrentCustomerName(costumer[0].name_customer);
      setCurrentCustomer(id);
      ToastifyError(costumer[0]);
      setCustomersDetailsLoading(false);
    } catch (error) {
      setCustomersDetailsLoading(false);
      ToastifyError(error);
    }
  };

  const handleGetChargesCustomer = async (id) => {
    try {
      setChargesCustomerLoading(true);
      const response = await fetch(`https://payment-system-app-api.herokuapp.com/customers/charges/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      const resultStatus = response.status;
      if (resultStatus === 200) {
        setCharges(result);
        setChargesMsg("");
      }
      if (resultStatus !== 200) {
        setChargesMsg(result);
      }
      setChargesCustomerLoading(false);
    } catch (error) {
      setChargesCustomerLoading(false);
      ToastifyError(error.message);
    }
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };

  return {
    searchFieldCustomers,
    setSearchFieldCustomers,
    token,
    setToken,
    removeToken,
    openModal,
    setOpenModal,
    openUserEditModal,
    setOpenUserEditModal,
    userPopUp,
    setUserPopUp,
    actualPage,
    setActualPage,
    formModalToEdit,
    setFormModalToEdit,
    editMessage,
    setEditMessage,
    setCurrentUserData,
    currentUserData,
    removeCurrentUserData,
    chargesSummaryData,
    customersSummaryData,
    summaryChargesMsg,
    summaryCustomersMsg,
    handleSummaryCharges,
    handleSummaryCustomers,
    currentCustomer,
    setCurrentCustomer,
    editingCostumer,
    setEditingCostumer,
    currentCustomerName,
    setCurrentCustomerName,
    currentClientData,
    setCurrentClientData,
    handleCustomerDetails,
    currentClientId,
    setCurrentClientId,
    handleGetChargesCustomer,
    charges,
    setCharges,
    loading,
    setLoading,
    editUserName,
    editEmail,
    editCpf,
    editPhone,
    editPass,
    editConfirmPass,
    setEditUserName,
    setEditEmail,
    setEditCpf,
    setEditPhone,
    setEditPass,
    setEditConfirmPass,
    chargesMsg,
    setChargesMsg,
    openModalCharge,
    setOpenModalCharge,
    custumersChanged,
    setCustumersChanged,
    addingCharges,
    setAddingCharges,
    openModalDetails,
    setOpenModalDetails,
    detailsModal,
    setDetailsModal,
    openModalEditingCharge,
    setOpenModalEditingCharge,
    editingCustomerData,
    setEditingCustomerData,
    loginUserNameInitialsObtainer,
    homeLoading,
    setHomeLoading,
    openModalDelete,
    setOpenModalDelete,
    handleCloseModalDelete,
    getIdChargeForDelete,
    setGetIdChargeForDelete,
    refreshPage,
    setRefreshPage,
    defaulterFilter,
    setDefaulterFilter,
    upToDateFilter,
    setUpToDateFilter,
    paidFilter,
    setPaidFilter,
    expectedFilter,
    setExpectedFilter,
    overdueFilter,
    setOverdueFilter,
    homeFilter,
    setHomeFilter,
    setCustomersLoading,
    customersLoading,
    chargesLoading,
    setChargesLoading,
    setCustomersDetailsLoading,
    customersDetailsLoading,
    setChargesCustomerLoading,
    chargesCustomerLoading,
  };
}
