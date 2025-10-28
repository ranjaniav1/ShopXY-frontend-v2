import React from "react";

const BrandReviewDrawer = ({ brand, reviews, analytics }) => {
    const starCounts = analytics?.starCounts || {};
    const totalReviews = analytics?.totalReviews || 0;

    const starColors = {
        1: "bg-red-500",
        2: "bg-orange-500",
        3: "bg-yellow-400",
        4: "bg-lime-500",
        5: "bg-green-600",
    };

    const getPercentage = (count) =>
        totalReviews > 0 ? (count / totalReviews) * 100 : 0;

    return (
        <div className="space-y-4">
            {/* Rating Breakdown */}
            {Object.keys(starCounts).map((star) => (

                <div key={star} className="p-4 rounded-md shadow bg-body">
                    <h2 className="text-lg font-bold text-tprimary mb-3">
                        Rating Breakdown
                    </h2>
                    <div className="flex items-center gap-2 mb-2">
                        <span
                            className={`text-sm font-semibold min-w-[50px] ${starColors[star]}`}
                        >
                            {star} ⭐
                        </span>
                        <div className="flex-1 bg-gray-200 h-2 rounded overflow-hidden">
                            <div
                                className={`h-full ${starColors[star]}`}
                                style={{ width: `${getPercentage(starCounts[star])}%` }}
                            ></div>
                        </div>
                        <span className="text-sm text-tsecondary ml-1">
                            {starCounts[star]} Review{starCounts[star] !== 1 ? "s" : ""}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                            {getPercentage(starCounts[star]).toFixed(1)}%
                        </span>
                    </div>
                </div>

            ))}


            {/* Detailed Reviews */}
            {
                reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div
                            key={review._id}
                            className="p-4 rounded-md shadow bg-body text-body"
                        >
                            <div className="flex items-center gap-3 mb-1">
                                <img
                                    src={review.userAvatar || "/avatar.png"}
                                    alt={review.userName}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <h3 className="font-bold text-tprimary">{review.userName}</h3>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="text-yellow-500 font-medium">
                                    {review.rating} ⭐
                                </span>
                                <span className="text-tsecondary">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-tprimary">{review.review}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-sm text-tsecondary mt-4">
                        No reviews available.
                    </p>
                )
            }
        </div >
    );
};

export default BrandReviewDrawer;
