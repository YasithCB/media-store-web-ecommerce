import React from "react";

export default function Description() {
  return (
    <section className="tf-sp-4">
      <div className="container">
        <div className="flat-animate-tab flat-title-tab-product-des">
          <div className="flat-title-tab text-center">
            <ul className="menu-tab-line" role="tablist">
              <li className="nav-tab-item" role="presentation">
                <a
                  href="#prd-review"
                  className="tab-link product-title fw-semibold"
                  data-bs-toggle="tab"
                >
                  Reviews
                </a>
              </li>
            </ul>
          </div>
            <div className="tab-main tab-review flex-lg-nowrap">
                <div className="tab-rating-wrap">
                    <div className="rating-percent">
                        <p className="rate-percent text-dark">
                            4.8 <span>/ 5</span>
                        </p>
                        <ul className="list-star justify-content-center">
                            <li>
                                <i className="icon-star" />
                            </li>
                            <li>
                                <i className="icon-star" />
                            </li>
                            <li>
                                <i className="icon-star" />
                            </li>
                            <li>
                                <i className="icon-star" />
                            </li>
                            <li>
                                <i className="icon-star text-main-4" />
                            </li>
                        </ul>
                        <p className="text-cl-3">Based on 1.738 reviews</p>
                    </div>
                    <ul className="rating-progress-list">
                        <li>
                            <p className="start-number body-text-3">
                                5<i className="icon-star text-third" />
                            </p>
                            <div className="rating-progress">
                                <div
                                    className="progress style-2"
                                    role="progressbar"
                                    aria-label="Basic example"
                                    aria-valuenow={0}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    <div
                                        className="progress-bar"
                                        style={{ width: "100%" }}
                                    />
                                </div>
                            </div>
                            <p className="count-review body-text-3">100</p>
                        </li>
                        <li>
                            <p className="start-number body-text-3">
                                4<i className="icon-star text-third" />
                            </p>
                            <div className="rating-progress">
                                <div
                                    className="progress style-2"
                                    role="progressbar"
                                    aria-label="Basic example"
                                    aria-valuenow={0}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    <div
                                        className="progress-bar"
                                        style={{ width: "80%" }}
                                    />
                                </div>
                            </div>
                            <p className="count-review body-text-3">87</p>
                        </li>
                        <li>
                            <p className="start-number body-text-3">
                                3<i className="icon-star text-third" />
                            </p>
                            <div className="rating-progress">
                                <div
                                    className="progress style-2"
                                    role="progressbar"
                                    aria-label="Basic example"
                                    aria-valuenow={0}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    <div
                                        className="progress-bar"
                                        style={{ width: "60%" }}
                                    />
                                </div>
                            </div>
                            <p className="count-review body-text-3">32</p>
                        </li>
                        <li>
                            <p className="start-number body-text-3">
                                2<i className="icon-star text-third" />
                            </p>
                            <div className="rating-progress">
                                <div
                                    className="progress style-2"
                                    role="progressbar"
                                    aria-label="Basic example"
                                    aria-valuenow={0}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    <div
                                        className="progress-bar"
                                        style={{ width: "40%" }}
                                    />
                                </div>
                            </div>
                            <p className="count-review body-text-3">24</p>
                        </li>
                        <li>
                            <p className="start-number body-text-3">
                                1<i className="icon-star text-third" />
                            </p>
                            <div className="rating-progress">
                                <div
                                    className="progress style-2"
                                    role="progressbar"
                                    aria-label="Basic example"
                                    aria-valuenow={0}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    <div
                                        className="progress-bar"
                                        style={{ width: "0%" }}
                                    />
                                </div>
                            </div>
                            <p className="count-review body-text-3">0</p>
                        </li>
                    </ul>
                    <div className="rating-filter-wrap">
                        <p className="title-sidebar fw-bold">Filter by</p>
                        <ul className="rating-filter-list">
                            <li>
                                <a href="#" className="bg-primary">
                                    All
                                </a>
                            </li>
                            <li>
                                <a href="#">5 sao (8)</a>
                            </li>
                            <li>
                                <a href="#">4 sao (12)</a>
                            </li>
                            <li>
                                <a href="#">3 sao (23)</a>
                            </li>
                            <li>
                                <a href="#">2 sao (10)</a>
                            </li>
                            <li>
                                <a href="#">1 sao (0)</a>
                            </li>
                        </ul>
                    </div>
                    <div className="add-comment-wrap">
                        <h5 className="fw-semibold">Add your comment</h5>
                        <div>
                            <form action="#" className="form-add-comment">
                                <fieldset className="rate">
                                    <label>Rating:</label>
                                    <ul className="list-star justify-content-start">
                                        <li>
                                            <i className="icon-star" />
                                        </li>
                                        <li>
                                            <i className="icon-star" />
                                        </li>
                                        <li>
                                            <i className="icon-star" />
                                        </li>
                                        <li>
                                            <i className="icon-star" />
                                        </li>
                                        <li>
                                            <i className="icon-star text-main-4" />
                                        </li>
                                    </ul>
                                </fieldset>
                                <fieldset>
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        required=""
                                    />
                                </fieldset>
                                <fieldset>
                                    <label>Email:</label>
                                    <input
                                        type="text"
                                        placeholder="Your email"
                                        required=""
                                    />
                                </fieldset>
                                <fieldset className="align-items-sm-start">
                                    <label>Comment:</label>
                                    <textarea placeholder="Message" defaultValue={""} />
                                </fieldset>
                                <div className="btn-submit">
                                    <button
                                        type="submit"
                                        className="tf-btn btn-gray btn-large-2"
                                    >
                                        <span className="text-white">Add Review</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="tab-review-wrap">
                    <ul className="review-list">
                        <li className="box-review">
                            <div className="avt">
                                <img
                                    alt=""
                                    src="/images/avatar/review-1.jpg"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className="review-content">
                                <div className="author-wrap">
                                    <h6 className="name fw-semibold">
                                        <a href="#" className="link">
                                            Cameron Williamson
                                        </a>
                                    </h6>
                                    <ul className="verified">
                                        <li className="body-small">Color: Black</li>
                                        <li className="body-small fw-semibold text-main-2">
                                            Verified Purchase
                                        </li>
                                    </ul>
                                    <ul className="list-star">
                                        <li>
                                            <i className="icon-star" />
                                        </li>
                                        <li>
                                            <i className="icon-star" />
                                        </li>
                                        <li>
                                            <i className="icon-star" />
                                        </li>
                                        <li>
                                            <i className="icon-star" />
                                        </li>
                                        <li>
                                            <i className="icon-star text-main-4" />
                                        </li>
                                    </ul>
                                </div>
                                <p className="text-review">
                                    Bought this nice little electric hot water kettle for
                                    an overnight date. She enjoyed tea and the hotel did
                                    not offer tea in the room. Problem solved! This kettle
                                    did its job, through the evening and into the morning
                                    we enjoyed many cups of nice, loose leaf tea. Too bad
                                    she ended up not liking me and eventually ghosted me.
                                    But, the tea was great thanks to this electric kettle.
                                    Highly recommend!
                                </p>
                                <p className="date-review body-small">
                                    14/12/2020 lúc 17:20
                                </p>
                            </div>
                        </li>
                        <li className="box-review">
                            <div className="avt">
                                <img
                                    alt=""
                                    src="/images/avatar/review-5.jpg"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className="review-content">
                                <div className="author-wrap">
                                    <h6 className="name fw-semibold">
                                        <a href="#" className="link">
                                            Cameron Williamson
                                        </a>
                                    </h6>
                                    <ul className="verified">
                                        <li className="body-small">Color: Black</li>
                                        <li className="body-small fw-semibold text-main-2">
                                            Verified Purchase
                                        </li>
                                    </ul>
                                    <ul className="list-star">
                                        <li>
                                            <i className="icon-star" />
                                        </li>
                                        <li>
                                            <i className="icon-star" />
                                        </li>
                                        <li>
                                            <i className="icon-star" />
                                        </li>
                                        <li>
                                            <i className="icon-star" />
                                        </li>
                                        <li>
                                            <i className="icon-star text-main-4" />
                                        </li>
                                    </ul>
                                </div>
                                <p className="text-review">
                                    Nullam ornare a magna quis aliquet. Duis suscipit eros
                                    in suscipit venenatis. Pellentesque quis efficitur
                                    leo. Maecenas accumsan est in nibh interdum, quis
                                    dignissim neque scelerisque. Ut suscipit et leo sit
                                    amet lacinia. Sed a laoreet leo, ut tristique risus.
                                    Integer a est ut est semper fermentum nec quis nunc.
                                    Phasellus aliquam neque eget quam gravida, quis
                                    venenatis turpis tristique. Mauris id congue augue.
                                    Pellentesque hendrerit porttitor purus, vel porttitor
                                    sem blandit vel.
                                </p>
                                <p className="date-review body-small">
                                    14/12/2020 lúc 17:20
                                </p>
                            </div>
                        </li>
                        <li className="box-review">
                            <div className="avt">
                                <img
                                    alt=""
                                    src="/images/avatar/review-6.jpg"
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className="review-content">
                                <div className="author-wrap">
                                    <h6 className="name fw-semibold">
                                        <a href="#" className="link">
                                            Cameron Williamson
                                        </a>
                                    </h6>
                                    <ul className="verified">
                                        <li className="body-small">Color: Black</li>
                                        <li className="body-small fw-semibold text-main-2">
                                            Verified Purchase
                                        </li>
                                    </ul>
                                    <ul className="list-star">
                                        <li>
                                            <i className="icon-star" />
                                        </li>
                                        <li>
                                            <i className="icon-star" />
                                        </li>
                                        <li>
                                            <i className="icon-star" />
                                        </li>
                                        <li>
                                            <i className="icon-star" />
                                        </li>
                                        <li>
                                            <i className="icon-star text-main-4" />
                                        </li>
                                    </ul>
                                </div>
                                <p className="text-review">
                                    Suspendisse efficitur velit quis sodales facilisis.
                                    Aenean id enim nec purus interdum semper. In hac
                                    habitasse platea dictumst. Nulla posuere ac ligula sit
                                    amet posuere. Curabitur ultricies non dui ut blandit.
                                    In quis nulla nec tellus rutrum porttitor. Sed
                                    pharetra magna diam, et lacinia tortor congue ut.
                                </p>
                                <p className="date-review body-small">
                                    14/12/2020 lúc 17:20
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
