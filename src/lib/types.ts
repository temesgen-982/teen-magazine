export interface Edition {
  id: string; // uuid
  title: string; // text not null
  description: string | null; // text
  published_at: string; // timestamptz
  file_url: string | null; // text
  cover_image_url: string | null; // text
  created_by: string | null; // uuid
  created_at: string; // timestamptz
}

export interface Profile {
    id: string; 
    username: string | null;
    role: 'user' | 'admin';
}

export interface AnnouncementCategory {
  id: string;
  name: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  image_url: string | null;
  is_active: boolean;
  published_by: string;
  created_by: string | null;
  created_at: string;
  category_id: string | null;
}

export interface AnnouncementWithCategory extends Announcement {
  announcement_categories: {
    name: string;
  } | null;
}
