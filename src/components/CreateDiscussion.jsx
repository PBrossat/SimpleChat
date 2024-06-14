import "../style/CreateDiscussion.css";
import Tooltip from "@mui/material/Tooltip";

export function CreateDiscussion(props) {
  
  function handleClick() {
    props.setIsInputCreateDiscussionVisible(!props.isCreateDiscussionInputVisible);
  }

  return (
    <div className="create-discussion-div">
      <Tooltip title="Créer une discussion" placement="right">
        <button className="button-creation-disccusion" onClick={handleClick}>
          <svg width="30px" height="30px" viewBox="0 0 24 24">
            <g>
              <g>
                <g>
                  <g>
                    <path
                      d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
                      fill="none"
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.704"
                    ></path>
                    <polygon
                      fill="none"
                      points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
                      stroke="#000000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.704"
                    ></polygon>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </button>
      </Tooltip>
    </div>
  );
}
