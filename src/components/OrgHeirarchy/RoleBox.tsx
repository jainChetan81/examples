import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { Avatar } from "@mui/material";
import { type FC } from "react";
import type { SAMPLE_DATA } from "../../types";
import { findAvatarInitials } from "./utils";
type Props = {
	user_info: SAMPLE_DATA;
};
const RoleBox: FC<Props> = ({ user_info }) => {
	return (
		<div className="role_box">
			<div className="role_title">
				<aside>
					<Avatar sx={{ backgroundColor: "#D9F0FD", color: "#25A8F4" }}>
						{findAvatarInitials(user_info?.firstname + " " + user_info?.lastname)}
					</Avatar>
				</aside>
				<div>
					{user_info.title && <span className={`role_badge ${user_info.title}`}>{user_info.title}</span>}
					<h4>{user_info?.firstname + " " + user_info?.lastname}</h4>
				</div>
			</div>
			<div className="role_buttons">
				<button title="Delete Admin" className="delete">
					<DeleteOutlineOutlinedIcon />
				</button>
				<button title="Edit Admin" className="edit">
					<EditOutlinedIcon />
				</button>
				<button title="Add Admin" className="add">
					<PersonAddAlt1OutlinedIcon />
				</button>
			</div>
		</div>
	);
};

export default RoleBox;
