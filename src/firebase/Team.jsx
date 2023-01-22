const Team = ({ data }) => {
      if (data.isTeam) {
            return (
                  <div>team exists</div>
            );
      }
      return (
        <div>
          <button>Create Team</button>
          <button>Join Team</button>
        </div>
      );
}
export default Team;