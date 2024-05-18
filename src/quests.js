require('colors');
const { apiRequest } = require('./api');

let latestSeason;

const getAllQuests = async (bearerToken) => {
  try {
    const data = await apiRequest(
      'https://www.infinigods.com/api/mountOlympus/getSocialPoints',
      bearerToken
    );

    latestSeason = data.currentSeason.seasonId;
    const specialQuests = data.socialPoints.dailyQuests
      .filter((item) => !item.completed)
      .map((data) => ({ id: data.quest._id, title: data.quest.title }));
    const seasonalQuests = data.socialPoints.seasonalQuests
      .filter((item) => !item.completed)
      .map((data) => ({ id: data._id, title: data.title }));
    return { latestSeason, specialQuests, seasonalQuests };
  } catch (error) {
    console.error('Error in Get Quests: ' + error);
  }
};

const handleQuest = async (bearerToken, quest, action) => {
  const url =
    action === 'complete'
      ? 'https://www.infinigods.com/api/mountOlympus/startQuest'
      : 'https://www.infinigods.com/api/mountOlympus/claimQuest';

  try {
    const data = await apiRequest(url, bearerToken, {
      seasonId: latestSeason,
      questId: quest.id,
    });

    if (data.Success) {
      const actionText =
        action === 'complete' ? 'cleared' : 'claimed! Congrats boy ^_^';
      console.log(
        `Quest "${quest.title}" has been ${actionText}. Status: ${data.message}`[
          action === 'complete' ? 'yellow' : 'green'
        ]
      );
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(
      `Error in ${action === 'complete' ? 'Complete' : 'Claim'} Quest: ${error}`
    );
  }
};

const processQuests = async (bearerToken) => {
  try {
    const { specialQuests, seasonalQuests } = await getAllQuests(bearerToken);

    if (specialQuests.length > 0) {
      for (const quest of specialQuests) {
        await handleQuest(bearerToken, quest, 'complete');
        await handleQuest(bearerToken, quest, 'claim');
      }
    } else {
      console.log('All special quests have been claimed >.<'.green);
    }

    if (seasonalQuests.length > 0) {
      for (const quest of seasonalQuests) {
        await handleQuest(bearerToken, quest, 'complete');
        await handleQuest(bearerToken, quest, 'claim');
      }
    } else {
      console.log('All seasonal quests have been claimed >.<'.green);
    }
  } catch (error) {
    console.error('Error in Process Quests: ' + error);
  }
};

module.exports = { getAllQuests, handleQuest, processQuests };
