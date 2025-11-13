import React, {useEffect, useState} from "react";
import RecentProducts from "@/components/common/RecentProducts";
import Features2 from "@/components/common/Features2";
import Footer1 from "@/components/footers/Footer1";
import {Link, useLocation, useParams} from "react-router-dom";
import Products3 from "@/components/products/Products3";

import MetaComponent from "@/components/common/MetaComponent";
import {
    getAllEquipments,
    getBrandNewEquipments,
    getEquipmentById, getEquipmentByName,
    getRentEquipments,
    getUsedEquipments
} from "@/api/equipments.js";
import {getAllDealers, getDealerByName, getTopRatedDealers} from "@/api/dealers.js";
import {getAllJobs, getJobsByName, getJobsBySubCategoryId, getJobsHiring} from "@/api/jobs.js";
import LoadingDots from "@/components/custom/loadingDots.jsx";
import {getAllStudios, getStudioByName} from "@/api/studio.js";
import Header2 from "@/components/headers/Header2.jsx";
import Topbar1 from "@/components/headers/Topbar1.jsx";

const metadata = {
    title: "Shop | MediaStore",
    description: "MediaStore - MultiMedia eCommerce Website",
};

export default function ShopFullwidthPage() {
    const {id, title} = useParams();
    const [data, setData] = useState(null);

    const {search} = useLocation(); // gives you ?search=abc&category=xyz
    const params = new URLSearchParams(search);
    const searchText = params.get("search");
    const category = params.get("category");

    const fetchDataBySearch = async () => {
        let result;
        if (category === "Equipments & Machinery") {
            result = await getEquipmentByName(searchText);
        } else if (category === "Jobs") {
            result = await getJobsByName(searchText);
        } else if (category === "Top Dealers") {
            result = await getDealerByName(searchText);
        } else if (category === "Studios") {
            result = await getStudioByName(searchText);
        }
        setData(result.data)
    }

    const fetchDataById = async () => {
        try {
            let result;

            if (id === "video-camera") {
                result = await getEquipmentById(5);
            } else if (id === "audio-sound") {
                result = await getEquipmentById(4);
            } else if (id === "top-dealers") {
                result = await getAllDealers();
            } else if (id === "equipments") {
                result = await getAllEquipments();
            } else if (id === "used-items") {
                result = await getUsedEquipments();
            } else if (id === "rent-items") {
                result = await getRentEquipments();
            } else if (id === "job-seeking") {
                result = await getJobsHiring();
            } else if (id === "all-jobs") {
                result = await getAllJobs();
            } else if (id === "brand-new-items") {
                result = await getBrandNewEquipments();
            } else if (id === "printing-machinery") {
                result = await getEquipmentById(35);
            } else if (id === "studios") {
                result = await getAllStudios();
            } else {
                result = await getAllEquipments();
            }

            setData(result.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (searchText && category) {
            fetchDataBySearch()
        } else {
            fetchDataById();
        }
    }, [id]);

    useEffect(() => {
        // Trigger API call when search or category changes
        if (search || category) {
            fetchDataBySearch();
        }
    }, [search, category]); // 👈 re-run whenever query params change

    if (!data) return <LoadingDots/>;

    return (
        <>
            <MetaComponent meta={metadata}/>
            <Topbar1 parentClass="tf-topbar"/>
            <Header2 fullWidth/>
            <div className="tf-sp-1">
                <div className="container-full">
                    <ul className="breakcrumbs">
                        <li>
                            <Link to={`/`} className="body-small link">
                                {" "}
                                Home{" "}
                            </Link>
                        </li>
                        <li className="d-flex align-items-center">
                            <i className="icon icon-arrow-right"/>
                        </li>
                        <li>
                            <span className="body-small">Product Grid</span>
                        </li>
                    </ul>
                </div>
            </div>
            <Products3 itemList={data} title={title || searchText}/>
            <RecentProducts fullWidth/>
            <Features2 fullWidth/>
            <Footer1 fullWidth/>
        </>
    );
}
