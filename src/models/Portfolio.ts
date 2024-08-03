import mongoose, { Document, Schema } from "mongoose";

interface IPortfolio extends Document {
  image: string;
  clientName: string;
  shortDescription: string;
  category:
    | "Logo Design"
    | "Social Media Post"
    | "Flyer Design"
    | "Stationary"
    | "Motion Graphics & Animation";
}

const PortfolioSchema: Schema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Logo Design",
        "Social Media Post",
        "Flyer Design",
        "Stationary",
        "Motion Graphics & Animation",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Portfolio ||
  mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);
