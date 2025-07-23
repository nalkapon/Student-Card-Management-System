

describe('Iterator Pattern Usage in Components', () => {
    test('ManageFriends renders mapped friend rows correctly', () => {
      const friends = [
        { friendName: 'Ali', friendEmail: 'ali@example.com', friendBalance: 50 },
        { friendName: 'Veli', friendEmail: 'veli@example.com', friendBalance: 0 }
      ];
  
      const rendered = friends.map(friend => ({
        name: friend.friendName,
        email: friend.friendEmail,
        balance: friend.friendBalance !== null ? `${friend.friendBalance} ₺` : '0 ₺'
      }));
  
      expect(rendered).toEqual([
        { name: 'Ali', email: 'ali@example.com', balance: '50 ₺' },
        { name: 'Veli', email: 'veli@example.com', balance: '0 ₺' }
      ]);
    });
  
    test('DailyMenu groups menu items correctly by weekday', () => {
      const mockMenuData = [
        { date: '2025-07-21', menu_description: 'Kuru Fasulye, Pilav' }, 
        { date: '2025-07-22', menu_description: 'Tavuk, Salata' }       
      ];
  
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
      const groupedMenus = days.map(day =>
        mockMenuData.filter(menu =>
          new Date(menu.date).toLocaleDateString('en-US', { weekday: 'long' }) === day
        )
      );
  
      expect(groupedMenus[0][0].menu_description).toBe('Kuru Fasulye, Pilav'); 
      expect(groupedMenus[1][0].menu_description).toBe('Tavuk, Salata');      
    });
  });
  